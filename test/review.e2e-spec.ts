import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { AuthDto } from 'src/auth/dto/auth.dto';
// import { AuthDto } from 'src/auth/dto/auth.dto';

const testProductId = '64d40c2c62002ad7efc34f00';

const reviewData: CreateReviewDto = {
  name: 'string',
  title: 'string',
  description: 'string',
  rating: 3,
  productId: testProductId,
};

const testUser: AuthDto = {
  email: 'test17@gmail.com',
  password: '1234567',
};

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  //   let createdId: string;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(testUser);
    // console.log('BODY IN TEST', body);
    token = body.user.token;
  }, 60000);

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(reviewData)
      .expect(201)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/review/byProduct/:productId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${testProductId}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  it('/review/byProduct/:productId (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete(`/review/byProduct/${testProductId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body).toBeDefined();
      });
  });

  afterAll(() => {
    disconnect();
  });
});
