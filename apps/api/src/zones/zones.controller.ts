import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto, UpdateZoneDto } from './zones.dto';

@Controller('zones')
export class ZoneController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.zonesService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id);
  }
}
