import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';

class ProductCharacteristic {
  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class CreateProductDto {
  @IsString()
  image: string;

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  oldPrice: number;

  @IsNumber()
  credit: number;

  @IsNumber()
  calculatedRating: number;

  @IsString()
  description: string;

  @IsString()
  advantages: string;

  @IsString()
  disadvantages: string;

  @IsArray()
  categories: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @IsObject({ each: true })
  characteristics: ProductCharacteristic[];
}
