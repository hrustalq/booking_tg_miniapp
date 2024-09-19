import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { BranchesService } from 'src/branches/branches.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetHostgroupsResponse } from 'src/types/hostgroup.types';

@Injectable()
export class ZonesService {
  constructor(
    private prisma: PrismaService,
    private branchesService: BranchesService,
  ) {}

  async create(createZoneDto: CreateZoneDto) {
    return this.prisma.zone.create({
      data: createZoneDto,
    });
  }

  async findAll(page: number, limit: number, branchId: string) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.zone.findMany({
        skip,
        take: limit,
        where: {
          branchId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          hourlyRate: true,
          branchId: true,
          pcAmount: true,
          pcSpecs: true,
        },
      }),
      this.prisma.zone.count({
        where: {
          branchId,
        },
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

  findOne(id: string) {
    return this.prisma.zone.findUnique({
      where: { id },
    });
  }

  update(id: string, updateZoneDto: UpdateZoneDto) {
    return this.prisma.zone.update({
      where: { id },
      data: updateZoneDto,
    });
  }

  remove(id: string) {
    return this.prisma.zone.delete({
      where: { id },
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async fillDatabaseFromBranches() {
    try {
      const branches = await this.branchesService.findAll(1, 100);
      branches.items.forEach(async (branch) => {
        const apiClient = this.branchesService.getApiClient(branch.id);
        const params: {
          'Pagination.Limit': 1000;
        } = {
          'Pagination.Limit': 1000,
        };
        const { data: response }: GetHostgroupsResponse = await apiClient.get(
          '/api/hostgroups',
          { params },
        );
        response.result.forEach(async (hostgroup) => {
          await this.prisma.zone.upsert({
            where: {
              internalId_branchId: {
                branchId: branch.id,
                internalId: hostgroup.id,
              },
            },
            update: {
              branchId: branch.id,
              internalId: hostgroup.id,
              name: hostgroup.name,
              hourlyRate: 0,
            },
            create: {
              internalId: hostgroup.id,
              branchId: branch.id,
              name: hostgroup.name,
              hourlyRate: 0,
            },
          });
        });
      });
    } catch (error) {
      console.error('Error filling database from branches:', error);
    }
  }
}
