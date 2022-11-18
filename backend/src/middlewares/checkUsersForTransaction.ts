import { NextFunction, Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { fromUsername, toUsername } = req.body;

  if (fromUsername === toUsername) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .json({ message: 'User cannot transfer money to itself' });
  }

  return next();
};
