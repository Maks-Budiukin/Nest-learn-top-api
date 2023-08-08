import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { Review, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
    ]),
    ConfigModule,
  ],
  providers: [ReviewService, JwtService],
  exports: [ReviewService],
})
export class ReviewModule {}
