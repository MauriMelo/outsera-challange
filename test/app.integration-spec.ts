import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('ProducerController (integration)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/producers/awards-interval (GET)', () => {
    return request(app.getHttpServer())
      .get('/producers/awards-interval')
      .expect(200)
      .expect({
        min: [
          {
            producer: 'Joel Silver',
            previousWin: 1990,
            followingWin: 1991,
            interval: 1,
          },
        ],
        max: [
          {
            producer: 'Matthew Vaughn',
            previousWin: 2002,
            followingWin: 2015,
            interval: 13,
          },
        ],
      });
  });
});
