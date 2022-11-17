import { Request, Response, Router } from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = Router();

const controller = new TransactionController();

router
  .post(
    '/transaction',
    (req: Request, res: Response) => controller.newTransaction(req, res),
  );

export default router;
