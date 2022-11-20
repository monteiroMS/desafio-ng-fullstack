import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import UserController from '../controllers/user.controller';

const router = Router();

const controller = new UserController();

router
  .get(
    '/user/:username',
    auth,
    (req: Request, res: Response) => controller.getByUsername(req, res),
  );

export default router;
