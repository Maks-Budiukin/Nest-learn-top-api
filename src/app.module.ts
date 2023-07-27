import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getMongoConfig } from './configs/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(
      {
        useFactory: () => ({
          uri: 'mongodb+srv://learnnestzlodey:c8fx1g33GNPt3gYR@cluster0.x6wnx6h.mongodb.net/NestDB?retryWrites=true&w=majority',
        }),
      },
      // {
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: getMongoConfig,
      // }
    ),
    AuthModule,
    ReviewModule,
    TopPageModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
