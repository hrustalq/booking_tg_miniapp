import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './branches.dto';

@Injectable()
export class BranchesService {
  constructor(private prisma: PrismaService) {}

  create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: createBranchDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.branch.findMany({
        skip,
        take: limit,
      }),
      this.prisma.branch.count(),
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
    return this.prisma.branch.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: updateBranchDto,
    });
  }

  remove(id: string) {
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
