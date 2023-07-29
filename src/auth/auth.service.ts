import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.model';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
  ) {}

  async create(dto: AuthDto) {
    const createdUser = await this.authModel.create(dto);
    return createdUser;
  }

  async find(email: string) {
    const foundUser = await this.authModel.findOne({ email });
    return foundUser;
  }
}
