import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageDto } from './dto/top-page.dto';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: TopPageDto) {
    return await this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.topPageService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.topPageService.delete(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageDto) {
    return this.topPageService.update(id, dto);
  }

  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {
    return await this.topPageService.find(dto);
  }
}
