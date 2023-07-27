import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User, AuthSchema } from './auth.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: AuthSchema,
      },
    ]),
  ],
})
export class AuthModule {}
