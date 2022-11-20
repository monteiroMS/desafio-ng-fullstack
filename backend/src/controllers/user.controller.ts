import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";
import { IUser } from "../interfaces/IUser";

export default class UserController {
  constructor(
    private _userService: UserService = new UserService(),
    private _transactionService: TransactionService = new TransactionService(),
  ) {}

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

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this._userService.login({ username, password });
      return res.status(statusCodes.OK).json(user);
    } catch (error) {
      if (error instanceof Error) return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await this._userService.create({ username, password });
      return res.status(statusCodes.CREATED).json(user);
    } catch (error) {
      if (error instanceof Error) return res
      .status(statusCodes.INTERNAL_ERROR)
      .json({ message: error.message });
    }
  }

  public async getByUsername(req: Request, res: Response) {
    const { username } = req.params;
    const user = await this._userService.getOneByUsername(username);

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    return res.status(statusCodes.OK).json({
      id: user.id,
      username: user.username,
      accountId: user.accountId,
      account: user.account,
    });
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
}
