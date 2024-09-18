import { Module } from '@nestjs/common';
import { PcsController } from './pcs.controller';
import { PcsService } from './pcs.service';
import { BranchesModule } from '../branches/branches.module'; // Add this import
import { PrismaModule } from '../shared/prisma/prisma.module';
import { ZonesModule } from 'src/zones/zones.module';

@Module({
  imports: [PrismaModule, BranchesModule, ZonesModule], // Add BranchesModule here
  controllers: [PcsController],
  providers: [PcsService],
  exports: [PcsService],
})
export class PcsModule {}
