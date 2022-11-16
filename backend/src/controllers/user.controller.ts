import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";

export default class UserController {
  constructor(
    private _service: UserService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const token = await this._service.login({ username, password });
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
      const token = await this._service.create({ username, password });
      return res.status(statusCodes.CREATED).json({ token });
    } catch (error) {
      if (error instanceof Error) return res
      .status(statusCodes.INTERNAL_ERROR)
      .json({ message: error.message });
    }

  }
}
