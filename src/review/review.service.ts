import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument, ReviewSchema } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteResult } from 'mongodb/mongodb';

import { Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from './review.constants';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const createdReview = await this.reviewModel.create(dto);

    // await createdReview.save({ timestamps: true });

    return createdReview;
  }

  async delete(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id);
  }

  async findByProductId(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) });
  }

  async deleteByProductId(
    productId: string,
  ): Promise<DeleteResult | HttpException> {
    const deletedReviews = this.reviewModel.deleteMany({
      productId: new Types.ObjectId(productId),
    });
    if (!deletedReviews) {
      return new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedReviews;
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
