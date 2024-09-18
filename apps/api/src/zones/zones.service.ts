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

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.zone.findMany({
        skip,
        take: limit,
      }),
      this.prisma.zone.count(),
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
    return this.prisma.zone.findUnique({
      where: { id },
    });
  }

  update(id: number, updateZoneDto: UpdateZoneDto) {
    return this.prisma.zone.update({
      where: { id },
      data: updateZoneDto,
    });
  }

  remove(id: number) {
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
          '/api/v2.0/hostgroups',
          { params },
        );
        response.result.data.forEach((hostgroup) => {
          this.prisma.zone.upsert({
            where: { id: hostgroup.id },
            update: {
              id: hostgroup.id,
              branchId: branch.id,
              name: hostgroup.name,
              hourlyRate: 0,
            },
            create: {
              id: hostgroup.id,
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
