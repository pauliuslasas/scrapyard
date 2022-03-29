import { CronJob } from 'cron';

import Logger from '../../logger';
import { PartService } from '../services/part-service';

export class UpdatePartsJob {
  private job: CronJob;

  constructor(private partService: PartService) {
    this.initializeCronJob();
  }

  private initializeCronJob() {
    this.job = new CronJob('*/20 * * * * *', async () => {
      Logger.info('Starting update');
      await this.partService.update();
      Logger.info('Parts updated');
    });
  }

  startCronJob(): void {
    this.job.start();
  }

  stopCronJob(): void {
    this.job.stop();
  }
}
