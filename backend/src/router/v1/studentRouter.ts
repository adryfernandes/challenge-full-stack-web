import { Router } from 'express';

import createStudentController from '@/controller/student/CreateStudentController';

const router = Router();

router.post('/create', createStudentController.handle);

export { router as studentRouter };
