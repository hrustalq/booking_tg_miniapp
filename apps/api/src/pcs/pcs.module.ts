import { Module } from '@nestjs/common';
import { PcsController } from './pcs.controller';
import { PcsService } from './pcs.service';

@Module({
  controllers: [PcsController],
  providers: [PcsService],
})
export class PcsModule {}
