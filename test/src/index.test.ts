import { Container } from '../../src/container';
import { UpdatePartsJob } from '../../src/domain/jobs/part-update-job';

describe('index test', () => {
  test('Test server start ', async () => {
    // ARANGE
    const partUpdateJob = Container.get<UpdatePartsJob>('job.partUpdate');
    // ACT
    const server = (await import('../../src/index')).default;
    partUpdateJob.stopCronJob();
    server.close();
    // ASSERT
  });
});
