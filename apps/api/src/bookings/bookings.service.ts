import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus, PCStatus } from '@prisma/client';
import { BranchesService } from 'src/branches/branches.service';
import { BookPcResponse } from 'src/types/booking.types';

@Injectable()
export class BookingsService {
  constructor(
    private prisma: PrismaService,
    private branchesService: BranchesService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const { userId, pcId, branchId, gizmoAccountId, zoneId } = createBookingDto;

    const telegramUser = await this.prisma.telegramUser.findUnique({
      where: { id: userId },
    });

    if (!telegramUser) {
      throw new UnauthorizedException('User not found');
    }

    const gizmoAccount = await this.prisma.gizmoUser.findUnique({
      where: {
        branchId_internalId: {
          branchId: branchId,
          internalId: gizmoAccountId,
        },
        telegramUserId: userId,
      },
    });

    if (!gizmoAccount) {
      throw new UnauthorizedException('Gizmo account not found');
    }

    const pc = await this.prisma.pC.findFirst({
      where: {
        id: pcId,
        branchId: branchId,
        zoneId: zoneId,
      },
    });

    if (!pc) {
      throw new BadRequestException('PC not found');
    }

    if (pc.status !== PCStatus.AVAILABLE) {
      throw new BadRequestException('PC is not available');
    }

    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        pcId: pcId,
        status: BookingStatus.PENDING,
      },
    });

    if (existingBooking) {
      throw new BadRequestException('PC is already booked');
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new BadRequestException('Branch not found');
    }

    const requestUrl = `/api/users/${gizmoAccount.internalId}/login/${pc.internalId}`;
    const response: BookPcResponse = await apiClient.post(requestUrl, {});

    if (response.data.result !== 0) {
      throw new InternalServerErrorException('Failed to book PC');
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId: userId,
        pcId: pcId,
        branchId: branchId,
        gizmoAccountId: gizmoAccountId,
        status: BookingStatus.PENDING,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...bookingData } = booking;

    return {
      ...bookingData,
    };
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.booking.findMany({
        skip,
        take: limit,
      }),
      this.prisma.booking.count(),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findActiveBookings() {
    return this.prisma.booking.findMany({
      where: {
        status: BookingStatus.PENDING,
      },
    });
  }

  async findActiveBookingsByBranch(branchId: string) {
    return this.prisma.booking.findMany({
      where: {
        branchId: branchId,
        status: BookingStatus.PENDING,
      },
    });
  }

  async findActiveBookingsByPc(pcId: number) {
    return this.prisma.booking.findMany({
      where: {
        pcId: pcId,
        status: BookingStatus.PENDING,
      },
    });
  }

  async findActiveBookingsByGizmoAccount(
    gizmoAccountId: number,
    branchId: string,
  ) {
    return this.prisma.booking.findMany({
      where: {
        gizmoAccountId: gizmoAccountId,
        status: BookingStatus.PENDING,
        branchId: branchId,
      },
    });
  }

  async findActiveBookingsByTelegramUser(telegramUserId: number) {
    return this.prisma.booking.findMany({
      where: {
        userId: telegramUserId,
        status: BookingStatus.PENDING,
      },
    });
  }

  async findActiveBookingsByBranchAndPc(branchId: string, pcId: number) {
    return this.prisma.booking.findMany({
      where: {
        branchId: branchId,
        pcId: pcId,
        status: BookingStatus.PENDING,
      },
    });
  }

  async findActiveBookingsByBranchAndGizmoAccount(
    branchId: string,
    gizmoAccountId: number,
  ) {
    return this.prisma.booking.findMany({
      where: {
        branchId: branchId,
        gizmoAccountId: gizmoAccountId,
        status: BookingStatus.PENDING,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBookingDto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data: updateBookingDto,
    });
  }

  remove(id: string) {
    return this.prisma.booking.delete({
      where: { id },
    });
  }

  async findByUserId(
    userId: number,
    page: number,
    limit: number,
    gizmoAccountId?: number,
  ) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.booking.findMany({
        where: { userId, gizmoAccountId },
        skip,
        take: limit,
        select: {
          id: true,
          startTime: true,
          endTime: true,
          pc: {
            select: {
              id: true,
              internalId: true,
              zone: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          gizmoAccount: true,
          branch: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.booking.count({
        where: { userId },
      }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
