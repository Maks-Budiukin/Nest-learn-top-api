import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, model } from 'mongoose';
import { Types } from 'mongoose';
import { Product } from 'src/product/product.model';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop({ type: Types.ObjectId, ref: Product.name })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
