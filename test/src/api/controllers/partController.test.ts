import { Application } from 'express';
import request from 'supertest';

import { App } from '../../../../src/app';
import { Container } from '../../../../src/container';
import { UpdatePartsJob } from '../../../../src/domain/jobs/part-update-job';
import { Router } from '../../../../src/router';

describe('Part controller', () => {
  let app: Application;
  beforeEach(async () => {
    app = new App(new Router()).getInstance();
  });
  afterEach(async () => {
    const partUpdateJob = Container.get<UpdatePartsJob>('job.partUpdate');
    partUpdateJob.stopCronJob();
  });
  test('GET /api/v1/parts should return all parts', async () => {
    // ARANGE
    // ACT
    const response = await request(app).get('/api/v1/parts');
    // ASSERT
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Showing parts that are not rusted',
        responseData: expect.any(Object),
        status: 200,
      }),
    );
  });
  test('GET /api/v1/parts/id should return one part', async () => {
    // ARANGE
    // ACT
    const response = await request(app).get('/api/v1/parts/1');
    // ASSERT
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Here you go',
        responseData: expect.any(Object),
        status: 200,
      }),
    );
  });
  test('GET /api/v1/parts/id should return error with wrong id', async () => {
    // ARANGE
    // ACT
    const response = await request(app).get('/api/v1/parts/5000');
    // ASSERT
    expect(response.body).toEqual({ message: 'Part not found with id: 5000', status: 404, type: 'Error' });
  });
  test('POST /api/v1/parts should fail when inserted wrong parameter', async () => {
    // ARANGE
    // ACT
    const response = await request(app).post('/api/v1/parts').send({ namae: 'test', rustiness: 1 });
    // ASSERT
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message:
        'ValidationError: "name" is required. "age" is required. "quality" is required. "price" is required. "namae" is not allowed',
      type: 'body',
    });
  });
  test('POST /api/v1/parts should add one part with correct parameters', async () => {
    // ARANGE
    // ACT
    const response = await request(app)
      .post('/api/v1/parts')
      .send({ name: 'test', type: 'METAL', age: 1, rustiness: 1, quality: 1, price: 1 });
    // ASSERT
    expect(response.body).toEqual({
      status: 200,
      message: 'Part Added',
    });
  });
});
