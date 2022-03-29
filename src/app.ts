import express, { Application, Express, json, urlencoded } from 'express';

import { Container } from './container';
import { UpdatePartsJob } from './domain/jobs/part-update-job';
import { errorHandler, joiErrorHandler } from './error-handler';
import Logger from './logger';
import morganMiddleware from './morgan';
import { Router } from './router';

export class App {
  private expressApp: Express;

  constructor(private router: Router) {
    this.expressApp = express();
    this.initialize();
  }

  private initialize(): App {
    Logger.info('Initializing middleware');
    this.initializeMiddleware();
    Logger.info('Initializing routes');
    this.initializeRoutes();
    Logger.info('Initializing error handler');
    this.initializeErrorHandler();
    Logger.info('Initializing cron job');
    this.initializeCronJob();
    return this;
  }

  private initializeMiddleware() {
    this.expressApp.use(json({ limit: '1mb' }));
    this.expressApp.use(urlencoded({ extended: false }));
    this.expressApp.use(morganMiddleware);
  }

  private initializeRoutes() {
    this.router.registerRouter(this.expressApp);
  }
  private initializeErrorHandler() {
    this.expressApp.use(joiErrorHandler);
    this.expressApp.use(errorHandler);
  }
  private initializeCronJob() {
    const partUpdateJob = Container.get<UpdatePartsJob>('job.partUpdate');
    partUpdateJob.startCronJob();
  }

  getInstance(): Application {
    return this.expressApp;
  }
}
