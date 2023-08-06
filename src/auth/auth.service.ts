import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.model';
import { Model } from 'mongoose';
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
    console.log(foundUser);
    return foundUser;
  }

  async register(dto: AuthDto): Promise<Omit<Auth, 'password'>> {
    const user = await this.findUser(dto.email);
    if (user) {
      throw new ConflictException('User with this email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(dto.password, salt);
    const createdUser = await this.authModel.create({
      ...dto,
      password: hashPassword,
    });
    return { email: createdUser.email };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.findUser(dto.email);
    const correctPassword = await bcrypt.compare(dto.password, user.password);
    if (!user || !correctPassword) {
      throw new UnauthorizedException('Email or password is wrong!');
    }

    const payload = user.email;

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
