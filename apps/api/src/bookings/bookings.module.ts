import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { PcsModule } from 'src/pcs/pcs.module';
import { BranchesModule } from 'src/branches/branches.module';

@Module({
  imports: [PrismaModule, PcsModule, BranchesModule],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
