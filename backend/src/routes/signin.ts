import { Request, Response, Router } from 'express';
import validateUser from '../middlewares/validateUser';
import UserController from '../controllers/user.controller';
import checkExistentUsername from '../middlewares/checkExistentUsername';

const router = Router();

const controller = new UserController();

router
  .post(
    '/signin',
    validateUser,
    checkExistentUsername,
    (req: Request, res: Response) => controller.create(req, res),
  );

export default router;
