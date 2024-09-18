import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { BranchesService } from '../branches/branches.service';
import { CreatePcDto, UpdatePcDto } from './pcs.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetHostsResponse } from 'src/types/host.types';
import { ZonesService } from 'src/zones/zones.service';

@Injectable()
export class PcsService {
  constructor(
    private prisma: PrismaService,
    private branchesService: BranchesService,
    private readonly zonesService: ZonesService,
  ) {}

  create(createPcDto: CreatePcDto) {
    return this.prisma.pC.create({
      data: createPcDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.pC.findMany({
        skip,
        take: limit,
      }),
      this.prisma.pC.count(),
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
    return this.prisma.pC.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePcDto: UpdatePcDto) {
    return this.prisma.pC.update({
      where: { id },
      data: updatePcDto,
    });
  }

  remove(id: number) {
    return this.prisma.pC.delete({
      where: { id },
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchHostsForAllBranches() {
    const branches = await this.branchesService.findAll(1, 100);
    for (const branch of branches.items) {
      const apiClient = this.branchesService.getApiClient(branch.id);
      const response: GetHostsResponse = await apiClient.get(
        '/api/v2.0/hosts?Pagination.Limit=1000',
      );

      for (const host of response.data.result.data) {
        if (!host.hostGroupId || host.isDeleted) continue;
        const zone = await this.prisma.zone.findFirst({
          where: {
            id: host.hostGroupId,
            branchId: branch.id,
          },
        });

        if (!zone) {
          console.warn(
            `Zone ${host.hostGroupId} not found for branch ${branch.id}`,
          );
          continue;
        }

        await this.prisma.pC.upsert({
          where: { id: host.id, branchId: branch.id },
          update: {
            name: host.name,
            status: 'AVAILABLE',
            zoneId: zone.id,
          },
          create: {
            id: host.id,
            branchId: branch.id,
            name: host.name,
            status: 'AVAILABLE',
            zoneId: zone.id,
          },
        });
      }
    }
  }
}
