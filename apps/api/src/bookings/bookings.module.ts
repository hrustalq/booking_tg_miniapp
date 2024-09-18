import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { PcsModule } from 'src/pcs/pcs.module';

@Module({
  imports: [PrismaModule, PcsModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
