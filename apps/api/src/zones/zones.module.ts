import { Module } from '@nestjs/common';
import { ZoneController } from './zones.controller';
import { ZonesService } from './zones.service';

@Module({
  controllers: [ZoneController],
  providers: [ZonesService],
})
export class ZonesModule {}
