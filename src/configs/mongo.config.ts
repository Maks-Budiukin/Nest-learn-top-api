import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  return {
    uri: getMongoString(configService),
  };
};

const getMongoString = (configService: ConfigService): string => {
  return (
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    '/' +
    configService.get('MONGO_AUTHDATABASE') +
    '?' +
    'retryWrites=true&w=majority'
  );
};
