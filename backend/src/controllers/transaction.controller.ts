import { Request, Response } from "express";
import TransactionService from "../services/transaction.service";
import UserService from "../services/user.service";
import AccountService from "../services/account.service";
import statusCodes from "../helpers/statusCodes";
import sequelize from '../database/models';

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
}
