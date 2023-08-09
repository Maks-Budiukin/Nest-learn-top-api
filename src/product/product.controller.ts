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
  NotFoundException,
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
    const product = await this.productService.getById(id);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedProduct = await this.productService.delete(id);
    if (!deletedProduct) {
      throw new NotFoundException('Can not delete! Product not found!');
    }
    await this.reviewService.deleteByProductId(id);
    return deletedProduct;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {
    const updatedProduct = await this.productService.update(dto, id);
    if (!updatedProduct) {
      throw new NotFoundException('Can not update! Product not found!');
    }
    return updatedProduct;
  }

  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return await this.productService.findWithReviews(dto);
  }
}
