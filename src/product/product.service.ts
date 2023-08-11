import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewService } from 'src/review/review.service';
import { Review } from 'src/review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(dto);
    return createdProduct;
  }

  // async getAll(dto: FindProductDto): Promise<Product[]> {
  //   const category = dto.category;
  //   const allProducts = await this.productModel.find({ category }, null, {
  //     limit: Number(dto.limit),
  //   });
  //   return allProducts;
  // }

  async getById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return product;
  }

  async update(dto: CreateProductDto, id: string): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    return updatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }

  async findWithReviews(
    dto: FindProductDto,
  ): Promise<
    (Product & { review: Review[]; reviewCount: number; reviewAvg: number })[]
  > {
    return this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },

        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec();
    //  (as Product & { review: Review[], reviewCount: number, reviewAvg: number })[];
  }
}
