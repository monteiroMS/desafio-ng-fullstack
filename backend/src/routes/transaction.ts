import { Request, Response, Router } from 'express';
import auth from '../middlewares/auth';
import TransactionController from '../controllers/transaction.controller';
import checkBalance from '../middlewares/checkBalanceForTransaction';
import checkUsers from '../middlewares/checkUsersForTransaction';
import checkValue from '../middlewares/checkValue';

const router = Router();

const controller = new TransactionController();

router
  .post(
    '/transaction',
    auth,
    checkBalance,
    checkUsers,
    checkValue,
    (req: Request, res: Response) => controller.newTransaction(req, res),
  );

export default router;
