import { Request, Response, Router } from 'express';
import validateUser from '../middlewares/validateUser';
import UserController from '../controllers/user.controller';

const router = Router();

const controller = new UserController();

router
  .post(
    '/signin',
    validateUser,
    (req: Request, res: Response) => controller.create(req, res),
  );

export default router;
