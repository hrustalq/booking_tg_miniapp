import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
}
