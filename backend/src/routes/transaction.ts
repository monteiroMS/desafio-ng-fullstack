import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import TransactionController from '../controllers/transaction.controller';

const router = Router();

const controller = new TransactionController();

router
  .post(
    '/transaction',
    auth,
    (req: Request, res: Response) => controller.newTransaction(req, res),
  );

export default router;
