import { NextFunction, Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";

const service = new UserService();

export default async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  const user = await service.getOneByUsername(username);

  if (user) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'Username already registered' });
  }

  return next();
};
