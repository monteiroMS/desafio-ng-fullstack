import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const controller = new UserController();

router
  .post('/signin', (req: Request, res: Response) => controller.create(req, res));

export default router;
