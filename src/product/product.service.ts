import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(dto);
    return createdProduct;
  }

  async getAll(dto: FindProductDto): Promise<Product[]> {
    const category = dto.category;
    const allProducts = await this.productModel.find({ category }, null, {
      limit: Number(dto.limit),
    });
    return allProducts;
  }

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
}
