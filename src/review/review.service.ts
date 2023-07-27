import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

import { Types } from 'mongoose';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    console.log(dto);
    const createdReview = (await this.reviewModel.create(dto));
    return createdReview.save();
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel
      .find({ productId: new Types.ObjectId(productId) })
      .exec();
  }
}

// import { Cat } from './schemas/cat.schema';
// import { CreateCatDto } from './dto/create-cat.dto';

// @Injectable()
// export class CatsService {
//   constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}

//   async create(createCatDto: CreateCatDto): Promise<Cat> {
//     const createdCat = new this.catModel(createCatDto);
//     return createdCat.save();
//   }

//   async findAll(): Promise<Cat[]> {
//     return this.catModel.find().exec();
//   }
// }
