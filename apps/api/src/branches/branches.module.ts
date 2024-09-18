import { Module } from '@nestjs/common';
import { BranchesController } from './branches.controller';
import { BranchesService } from './branches.service';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { ApiClientModule } from 'src/shared/api-client/api-client.module';

@Module({
  imports: [PrismaModule, ApiClientModule],
  controllers: [BranchesController],
  providers: [BranchesService],
  exports: [BranchesService], // Make sure to export the service
})
export class BranchesModule {}
