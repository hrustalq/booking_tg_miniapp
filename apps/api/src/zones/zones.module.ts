import { Module } from '@nestjs/common';
import { ZoneController } from './zones.controller';
import { ZonesService } from './zones.service';
import { BranchesModule } from '../branches/branches.module';
import { PrismaModule } from 'src/shared/prisma/prisma.module';

@Module({
  imports: [BranchesModule, PrismaModule],
  controllers: [ZoneController],
  providers: [ZonesService],
  exports: [ZonesService],
})
export class ZonesModule {}
