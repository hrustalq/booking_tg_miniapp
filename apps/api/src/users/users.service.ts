import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BranchesService } from '../branches/branches.service';
import {
  GizmoUsersResponse,
  GizmoUsersWithBalanceResponse,
  GizmoUserValidationResponse,
  GizmoUserValidationResult,
} from 'src/types/gizmo-users.types';
import { VerifyGizmoUserDto } from './dto/verify-user.dto';
import { LinkAccountDto } from './dto/link-account.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private branchesService: BranchesService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.telegramUser.create({
      data: createUserDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.telegramUser.findMany({
        skip,
        take: limit,
      }),
      this.prisma.telegramUser.count(),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return this.prisma.telegramUser.findUnique({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.telegramUser.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.telegramUser.delete({
      where: { id },
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fillDatabaseFromGizmo() {
    try {
      const branches = await this.branchesService.findAll(1, 100);
      for (const branch of branches.items) {
        const apiClient = this.branchesService.getApiClient(branch.id);
        if (!apiClient) continue;
        const response: GizmoUsersResponse = await apiClient.get('/api/users', {
          params: {
            isDeleted: false,
            isDisabled: false,
          },
        });

        for (const user of response.data.result) {
          await this.prisma.gizmoUser.upsert({
            where: {
              branchId_internalId: {
                branchId: branch.id,
                internalId: user.id,
              },
            },
            update: {
              username: user.username,
              balance: 0,
              phone: user.phone,
            },
            create: {
              guid: user.guid,
              username: user.username,
              internalId: user.id,
              balance: 0,
              phone: user.phone,
              branchId: branch.id,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error filling database from Gizmo:', error);
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async updateUserBalances() {
    try {
      const branches = await this.branchesService.findAll(1, 100);
      for (const branch of branches.items) {
        const apiClient = this.branchesService.getApiClient(branch.id);
        const gizmoUsers = await this.prisma.gizmoUser.findMany({
          where: { branchId: branch.id },
          select: { internalId: true },
        });

        for (const user of gizmoUsers) {
          const { data }: GizmoUsersWithBalanceResponse = await apiClient.get(
            `/api/users/${user.internalId}/balance`,
          );

          await this.prisma.gizmoUser.update({
            where: {
              branchId_internalId: {
                branchId: branch.id,
                internalId: user.internalId,
              },
            },
            data: { balance: data.result.balance },
          });
        }
      }
    } catch (error) {
      console.error('Error updating user balances:', error);
    }
  }

  async searchGizmoUser(
    query: string,
    branchId: string,
    page: number,
    limit: number,
  ) {
    const users = await this.prisma.gizmoUser.findMany({
      where: {
        branchId: branchId,
        OR: [{ phone: { contains: query } }, { username: { contains: query } }],
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        guid: true,
        username: true,
        internalId: true,
        balance: true,
        branchId: true,
        phone: true,
      },
    });

    if (users.length === 0) {
      throw new NotFoundException('Пользователь не найден');
    }

    return users;
  }

  async findGizmoUserById(id: number) {
    const user = await this.prisma.gizmoUser.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Пользователь GizmoUser не найден');
    }

    return user;
  }

  async validateGizmoUser(dto: VerifyGizmoUserDto) {
    const user = await this.prisma.gizmoUser.findFirst({
      where: { username: dto.login },
    });
    if (!user) throw new NotFoundException('Пользователь не найден');

    const client = this.branchesService.apiClients.get(dto.branchId);

    const REQUEST_URL = `/api/users/${user.username}/${dto.password}/valid`;
    const response: GizmoUserValidationResponse = await client.get(REQUEST_URL);
    if (response.data.result.result === GizmoUserValidationResult.OK) {
      return true;
    }
    return false;
  }

  async linkAccount(linkAccountDto: LinkAccountDto) {
    const { params, credentials, data } = linkAccountDto;

    // Validate Gizmo user
    const isValid = await this.validateGizmoUser({
      login: data.username,
      password: data.password,
      branchId: params.branchId,
    });

    if (!isValid) {
      throw new BadRequestException('Invalid Gizmo user credentials');
    }

    // Find or create TelegramUser
    const telegramUserData = await this.prisma.telegramUser.upsert({
      where: { id: credentials.id },
      update: {
        ...credentials,
      },
      create: {
        ...credentials,
      },
    });

    // Find GizmoUser
    const gizmoUser = await this.prisma.gizmoUser.findUnique({
      where: {
        branchId_internalId: {
          branchId: params.branchId,
          internalId: params.gizmoAccountInternalId,
        },
      },
    });

    if (!gizmoUser) {
      throw new NotFoundException('Gizmo user not found');
    }

    // Link GizmoUser to TelegramUser
    const updatedGizmoUser = await this.prisma.gizmoUser.update({
      where: { id: gizmoUser.id },
      data: {
        telegramUserId: telegramUserData.id,
      },
    });

    return updatedGizmoUser;
  }

  async findLinkedGizmoUser(telegramUserId: number) {
    const gizmoUser = await this.prisma.gizmoUser.findMany({
      where: { telegramUserId },
      select: {
        id: true,
        guid: true,
        username: true,
        internalId: true,
        balance: true,
        branchId: true,
        phone: true,
      },
    });
    return gizmoUser;
  }
}
