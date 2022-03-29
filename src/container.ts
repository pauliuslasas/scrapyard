import { Container } from 'typedi';

import { PartController } from './api/controllers/part-controller';
import { UpdatePartsJob } from './domain/jobs/part-update-job';
import { PartService } from './domain/services/part-service';
import { Part } from './persistence/models/part-model';
import { PartRepository } from './persistence/repositories/part-repository';

Container.set([
  { id: 'part.repository', factory: () => new PartRepository(Part) },
  { id: 'part.service', factory: () => new PartService(Container.get<PartRepository>('part.repository')) },
  { id: 'part.controller', factory: () => new PartController(Container.get<PartService>('part.service')) },
  { id: 'job.partUpdate', factory: () => new UpdatePartsJob(Container.get<PartService>('part.service')) },
]);

export { Container };
