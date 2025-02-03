import { HttpStatusCode } from 'axios';
import type { Request, Response, NextFunction } from 'express';

import createStudentBusiness from '@/business/student/CreateStudentBusiness';

class CreateStudentController {
  async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req || {};

      const response = await createStudentBusiness.execute({
        name: body?.name,
        document: body?.document,
        email: body?.email,
        registration: body?.registration,
      });

      res.status(HttpStatusCode.Created).send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new CreateStudentController();
