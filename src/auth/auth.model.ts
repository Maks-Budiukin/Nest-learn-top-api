import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ versionKey: false, timestamps: true })
export class Auth {
  @Prop()
  @IsOptional()
  _id: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: null })
  token: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
