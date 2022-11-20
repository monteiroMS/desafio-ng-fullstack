import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import UserService from "../services/user.service";
import AccountService from "../services/account.service";
import statusCodes from "../helpers/statusCodes";
import sequelize from '../database/models';
import { IUser } from '../interfaces/IUser';

export default class TransactionController {
  constructor(
    private _userService: UserService = new UserService(),
    private _transactionService: TransactionService = new TransactionService(),
    private _accountService: AccountService = new AccountService(),
  ) {}

  public async newTransaction(req: Request, res: Response) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { fromUsername, toUsername, value } = req.body;
  
        const fromUser = await this._userService.getOneByUsername(fromUsername);
        const toUser = await this._userService.getOneByUsername(toUsername);
    
        if (!fromUser?.accountId || !toUser?.accountId) {
          return res.status(statusCodes.NOT_FOUND).json({ message: 'User not found' });
        }
    
        await this._accountService.newDebit(fromUser.accountId, value, t);
        await this._accountService.newCredit(toUser.accountId, value, t);
    
        const transaction = await this._transactionService.newTrasaction({
          debitedAccountId: fromUser.accountId,
          creditedAccountId: toUser.accountId,
          value,
        }, t);
    
        return res.status(statusCodes.CREATED).json(transaction);
      });
      return result;
    } catch (error) {
      if (error instanceof Error) return res
      .status(statusCodes.INTERNAL_ERROR)
      .json({ message: error.message });
    }
  }

  public async getTransactionsByUsername(req: Request, res: Response) {
    const { username } = req.params;

    const user = await this._userService.getOneByUsername(username);

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const transactions = await this.getAllTransactions(user);

    return res.status(statusCodes.OK).json(transactions);
  }

  public async filterTransactionsByDate(req: Request, res: Response) {
    const { username } = req.params;
    const { date } = req.body;

    const user = await this._userService.getOneByUsername(username);

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const transactions = await this
      .getTransactionsByDate(user, date);

    return res.status(statusCodes.OK).json(transactions);
  }

  private async getAllTransactions(user: IUser) {
    const cashIn = await this._transactionService
      .getCashIn(user.accountId as number);
    const cashOut = await this._transactionService
      .getCashOut(user.accountId as number);
    return { cashIn, cashOut };
  }

  private async getTransactionsByDate(user: IUser, date: string) {
    const cashIn = await this._transactionService
      .getCashInByDate(user.accountId as number, date);
    const cashOut = await this._transactionService
      .getCashOutByDate(user.accountId as number, date);
    return { cashIn, cashOut };
  }
}
