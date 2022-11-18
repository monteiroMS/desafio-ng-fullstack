import { NextFunction, Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";

const service = new UserService();

export default async (req: Request, res: Response, next: NextFunction) => {
  const { fromUsername, value } = req.body;

  const user = await service.getOneByUsername(fromUsername);

  if (!user) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'User not found' });
  }

  if (!user.account) {
    return res
      .status(statusCodes.INTERNAL_ERROR)
      .json({ message: 'Account not found' });
  }

  if (user.account.balance < value) {
    return res
      .status(statusCodes.CONFLICT)
      .json({ message: 'Insufficient balance'});
  }

  return next();
};
