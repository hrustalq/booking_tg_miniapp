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
  public async fillDatabaseFromBranches() {
    const branches = await this.branchesService.findAll(1, 100);

    await Promise.all(
      branches.items.map(async (branch) => {
        const apiClient = this.branchesService.getApiClient(branch.id);
        const params = { 'Pagination.Limit': 1000 };

        const { data: response }: GetHostgroupsResponse = await apiClient.get(
          '/api/hostgroups',
          { params },
        );

        // Get all existing zones for this branch
        const existingZones = await this.prisma.zone.findMany({
          where: { branchId: branch.id },
          select: { internalId: true },
        });
        const existingInternalIds = new Set(
          existingZones.map((zone) => zone.internalId),
        );

        // Upsert zones from the response
        await Promise.all(
          response.result.map(async (hostgroup) => {
            await this.prisma.zone.upsert({
              where: {
                internalId_branchId: {
                  branchId: branch.id,
                  internalId: hostgroup.id,
                },
              },
              update: {
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
            existingInternalIds.delete(hostgroup.id);
          }),
        );

        // Delete zones that weren't in the response
        if (existingInternalIds.size > 0) {
          await this.prisma.zone.deleteMany({
            where: {
              branchId: branch.id,
              internalId: { in: Array.from(existingInternalIds) },
            },
          });
        }
      }),
    );
  }
}
