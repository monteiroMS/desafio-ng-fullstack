import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";

export default class UserController {
  constructor(
    private _userService: UserService = new UserService(),
    private _transactionService: TransactionService = new TransactionService(),
  ) {}

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this._userService.login({ username, password });
      return res.status(statusCodes.OK).json({ token });
    } catch (error) {
      if (error instanceof Error) return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this._userService.create({ username, password });
      return res.status(statusCodes.CREATED).json({ token });
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

    return res.status(statusCodes.OK).json(user);
  }

  public async getTransactionsByUsername(req: Request, res: Response) {
    const { username } = req.params;

    const user = await this._userService.getOneByUsername(username);

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({
        message: 'User not found',
      });
    }

    const cashIn = await this._transactionService
      .getCashIn(user.accountId as number);
    const cashOut = await this._transactionService
      .getCashOut(user.accountId as number);

    return res.status(statusCodes.OK).json({ cashIn, cashOut });
  }
}
