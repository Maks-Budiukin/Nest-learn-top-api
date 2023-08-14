import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ReviewModule } from '../review/review.module';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
    ReviewModule,
  ],
  providers: [ProductService],
})
export class ProductModule {}
