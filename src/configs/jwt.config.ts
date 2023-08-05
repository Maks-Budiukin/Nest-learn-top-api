import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJWTConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => {
  const sec = configService.get('JWT_SECRET');
  console.log(sec, 'secret from ENV');
  return {
    secret: configService.get('JWT_SECRET'),
  };
};
