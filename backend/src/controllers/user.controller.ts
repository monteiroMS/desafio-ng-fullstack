import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";

export default class UserController {
  constructor(
    private _userService: UserService = new UserService(),
  ) {}

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
}
