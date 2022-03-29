import { Container } from './container';
import { UpdatePartsJob } from './domain/jobs/part-update-job';

const partUpdateJob = Container.get<UpdatePartsJob>('job.partUpdate');

process.on('SIGINT', () => {
  partUpdateJob.stopCronJob();
  process.exit(0);
});

process.on('SIGTERM', () => {
  partUpdateJob.stopCronJob();
  process.exit(0);
});

process.on('exit', () => {
  partUpdateJob.stopCronJob();
  process.exit(0);
});
