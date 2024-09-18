import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(private prisma: PrismaService) {}

  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({
      data: {
        ...createNewsDto,
        tags: {
          connectOrCreate: createNewsDto.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.news.findMany({
        skip,
        take: limit,
        include: { tags: true },
      }),
      this.prisma.news.count(),
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
    return this.prisma.news.findUnique({
      where: { id },
      include: { tags: true },
    });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.prisma.news.update({
      where: { id },
      data: {
        ...updateNewsDto,
        tags: {
          set: [],
          connectOrCreate: updateNewsDto.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });
  }

  remove(id: string) {
    return this.prisma.news.delete({
      where: { id },
    });
  }
}
