import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

class HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

class TopPageAdvantage {
  title: string;
  description: string;
}

export class TopPageDto {
  @IsObject()
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsObject()
  @IsOptional()
  hh?: HhData;

  @IsArray()
  @IsString({ each: true })
  advantages: TopPageAdvantage[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
