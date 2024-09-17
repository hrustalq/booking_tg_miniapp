import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: createPaymentDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.payment.findMany({
        skip,
        take: limit,
      }),
      this.prisma.payment.count(),
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
    return this.prisma.payment.findUnique({
      where: { id },
    });
  }

  update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return this.prisma.payment.update({
      where: { id },
      data: updatePaymentDto,
    });
  }

  remove(id: string) {
    return this.prisma.payment.delete({
      where: { id },
    });
  }
}
