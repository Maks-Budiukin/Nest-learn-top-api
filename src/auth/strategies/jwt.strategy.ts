import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Auth, AuthDocument } from '../auth.model';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from '../dto/auth.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  @InjectModel(Auth.name)
  private readonly authModel: Model<AuthDocument>;

  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(_id: string) {
    const decodedUser = await this.authModel.findById(_id);
    console.log('USER IN STRATEGY', _id);
    console.log('DECODED USER IN STRATEGY', decodedUser);

    return decodedUser;
  }

  // async checkUser(@Req() request: Request) { }

  // async validateUser(dto: AuthDto) {
  //   const email = await validate({ email })
  //   // const foundUser = await this.authModel.findOne({ email });
  //   const correctPassword = await bcrypt.compare(dto.password, user.password);
  //   if (!user || !correctPassword) {
  //     throw new UnauthorizedException('Email or password is wrong!');
  //   }
}
