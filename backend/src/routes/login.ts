import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

const controller = new UserController();

router
  .post('/login', (req: Request, res: Response) => controller.login(req, res));

export default router;
