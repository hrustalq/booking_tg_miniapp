import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateZoneDto, UpdateZoneDto } from './zones.dto';

@Injectable()
export class ZonesService {
  constructor(private prisma: PrismaService) {}

  create(createZoneDto: CreateZoneDto) {
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
}
