import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;
// export interface AuthModel extends Base {}

@Schema({ versionKey: false, timestamps: true })
export class Auth {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Cat>;

// @Schema()
// export class Cat {
//   @Prop()
//   name: string;

//   @Prop()
//   age: number;

//   @Prop()
//   breed: string;
// }
