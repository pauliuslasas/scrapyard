import { NextFunction, Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { PartService } from '../../domain/services/part-service';
import { ApiResponse } from '../api-response';
import { AddPartRequestSchema } from '../validators/add-part-validator';
import { GetPartRequestSchema } from '../validators/get-part-validator';

export class PartController {
  constructor(private partService: PartService) {}
  async getOne(req: ValidatedRequest<GetPartRequestSchema>, res: Response, next: NextFunction): Promise<unknown> {
    try {
      const part = await this.partService.getSinglePart(req.params['id']);
      return res.json(new ApiResponse(200, part, 'Here you go'));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<unknown> {
    try {
      const parts = await this.partService.getAllParts();
      return res.json(new ApiResponse(200, parts, 'Showing parts that are not rusted'));
    } catch (error) {
      next(error);
    }
  }

  async addPart(req: ValidatedRequest<AddPartRequestSchema>, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body;
      const part = await this.partService.addPart(
        body.name,
        body.type,
        body.age,
        body.rustiness,
        body.quality,
        body.price,
      );
      res.json(new ApiResponse(200, part, 'Part Added'));
    } catch (error) {
      next(error);
    }
  }
}
