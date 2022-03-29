import { Application } from 'express';
import swagger from 'swagger-ui-express';

import { PartController } from './api/controllers/part-controller';
import openApiDocumentation from './api/docs/api-documents.json';
import { addPartQuerySchema } from './api/validators/add-part-validator';
import { GetPartQuerySchema } from './api/validators/get-part-validator';
import { validate } from './api/validators/validator';
import { Container } from './container';
export class Router {
  constructor(private apiPrefix = '/api/v1') {}
  registerRouter(app: Application): void {
    this.registerPartRouter(app);
    this.registerDocsRoute(app);
  }

  private registerPartRouter(app: Application) {
    const partController = Container.get<PartController>('part.controller');

    app.get(`${this.apiPrefix}/parts`, partController.getAll.bind(partController));
    app.get(
      `${this.apiPrefix}/parts/:id`,
      validate('params', GetPartQuerySchema),
      partController.getOne.bind(partController),
    );

    app.post(
      `${this.apiPrefix}/parts`,
      validate('body', addPartQuerySchema),
      partController.addPart.bind(partController),
    );
  }

  private registerDocsRoute(app: Application) {
    app.use('/api-docs', swagger.serve, swagger.setup(openApiDocumentation));
  }
}
