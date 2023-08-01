import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewService } from 'src/review/review.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(ReviewService)
    private readonly reviewService: ReviewService,
    private readonly productService: ProductService,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.productService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.reviewService.deleteByProductId(id);
    return await this.productService.delete(id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: Product) {
    return await this.productService.update(dto, id);
  }

  @Get()
  async find(@Body() dto: FindProductDto) {
    return await this.productService.getAll(dto);
  }
}
