import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { json } from 'sequelize';
import { Json } from 'sequelize/types/utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/auth')
      .expect(200);
  });

  it('/ (GET)', async () => {
    

    return await request(app.getHttpServer())
      .get('/auth/2')
      .expect((response: request.Response) => {
        const res = response.body;
        expect(JSON.stringify(res)).toContain('admin2');
      })
  });

  it('/POST', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({email: 'admin10', password: '123456'})
      .expect((response: request.Response) => {
        const { token }: {token: string} = response.body;
        expect(token).toContain('ey');
      })
  });
  it('/POST', async () => {
    return await request(app.getHttpServer())
      .post('/auth/create')
      .set('Accept', 'application/json')
      .send({email: 'admin433', password: '123456'})
      .expect((response: request.Response) => {
        const { message }: {message: string} = response.body;
        expect(message).toEqual('SUCCESS');
      })
  })
});
