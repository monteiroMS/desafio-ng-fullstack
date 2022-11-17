import { NextFunction, Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import UserService from "../services/user.service";

const service = new UserService();

export default async (req: Request, res: Response, next: NextFunction) => {
  const { value } = req.body;

  if (value <= 0) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'Invalid value (less than or equal zero)' });
  }

  return next();
};
