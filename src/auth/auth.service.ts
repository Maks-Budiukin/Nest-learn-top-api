import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.model';
import mongoose, { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<Auth> {
    const foundUser = await this.authModel.findOne({ email });
    return foundUser;
  }

  async register(dto: AuthDto): Promise<Pick<Auth, 'email'>> {
    const user = await this.findUser(dto.email);
    if (user) {
      throw new ConflictException('User with this email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const newUser = await this.authModel.create({
      ...dto,
      password: hashPassword,
    });
    return { email: newUser.email };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.findUser(dto.email);
    const correctPassword = await bcrypt.compare(dto.password, user.password);
    if (!user || !correctPassword) {
      throw new UnauthorizedException('Email or password is wrong!');
    }

    return user;
  }

  async login(user) {
    const payload = user.email;
    // console.log('USER IN LOGIN BEFORE JWTSIGN', user);
    const token = await this.jwtService.signAsync(payload);
    const updatedUser = await this.authModel.findByIdAndUpdate(
      user._id,
      { token },
      { new: true },
    );
    console.log('USER IN LOGIN', user);
    return {
      updatedUser,
    };
  }

  // async login(dto: AuthDto) {
  //   const user = await this.findUser(dto.email);
  //   const correctPassword = await bcrypt.compare(dto.password, user.password);
  //   console.log('USER IN VALIDATEUSER', user);
  //   if (!user || !correctPassword) {
  //     throw new UnauthorizedException('Email or password is wrong!');
  //   }

  //   console.log('ID IN LOGIN', user._id);
  //   const payload = user._id;

  //   // const userById = await this.authModel.findById(objectId);
  //   // console.log('USER BY ID IN LOGIN', userById);

  //   // const userFindOne = await this.authModel.findOne({ _id: objectId });
  //   // console.log('userFindOne', userFindOne);

  //   const token = await this.jwtService.signAsync(payload);
  //   console.log('TOKEN IN LOGIN', token);

  //   const updatedUser = await this.authModel.findByIdAndUpdate(
  //     user._id,
  //     { token },
  //     { new: true },
  //   );
  //   console.log('USER IN LOGIN', user);
  //   return {
  //     updatedUser,
  //   };
  // }

  // async refresh(dto: AuthDto) {
  //   console.log('DTO FROM REFRESH', dto);
  //   const user = this.jwtService.decode(dto.token);
  //   console.log('USER FROM REFRESH', user);
  //   return user;
  // }
}
