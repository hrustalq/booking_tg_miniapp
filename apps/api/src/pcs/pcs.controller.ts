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
import { PcsService } from './pcs.service';
import { CreatePcDto, UpdatePcDto } from './pcs.dto';

@Controller('pcs') // Ensure this is plural
export class PcsController {
  constructor(private readonly pcsService: PcsService) {}

  @Post()
  create(@Body() createPcDto: CreatePcDto) {
    return this.pcsService.create(createPcDto);
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.pcsService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pcsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePcDto: UpdatePcDto) {
    return this.pcsService.update(id, updatePcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pcsService.remove(id);
  }
}
