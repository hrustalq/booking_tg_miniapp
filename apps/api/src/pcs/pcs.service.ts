import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePcDto, UpdatePcDto } from './pcs.dto';

@Injectable()
export class PcsService {
  constructor(private prisma: PrismaService) {}

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

  findOne(id: string) {
    return this.prisma.pC.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePcDto: UpdatePcDto) {
    return this.prisma.pC.update({
      where: { id },
      data: updatePcDto,
    });
  }

  remove(id: string) {
    return this.prisma.pC.delete({
      where: { id },
    });
  }
}
