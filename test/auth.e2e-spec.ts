import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  email: 'test17@gmail.com',
  password: '1234567',
};

const wrongLoginDto = {
  email: 'test17@gmail.com',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 60000);

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '2' })
      .expect(401);
  });

  it('/auth/login (POST) - fail login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, email: 'aaa@a.ru' })
      .expect(401);
  });

  // it('/auth/login (POST) - missing data', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({})
  //     .expect(400);
  // });

  // it('/auth/login (POST) - missing email', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send({ password: '1234567' })
  //     .expect(400);
  // });

  // it('/auth/login (POST) - missing password', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/login')
  //     .send(wrongLoginDto)
  //     .expect(400);
  // });

  afterAll(() => {
    disconnect();
  });
});
