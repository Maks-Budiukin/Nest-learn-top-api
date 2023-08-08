import {
  Controller,
  HttpCode,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const validatedUser = await this.authService.validateUser(dto);
    const user = await this.authService.login(validatedUser);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refresh(@Body() dto: AuthDto) {
    // await this.authService.refresh(dto);
  }
}
