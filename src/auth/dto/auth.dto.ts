import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @IsOptional()
  @IsString()
  _id?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Min password length is 6 symbols' })
  password: string;

  @IsOptional()
  token?: string;
}
