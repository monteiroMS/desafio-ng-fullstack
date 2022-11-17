import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

const tokenErrors = {
  NOT_FOUND_MESSAGE: 'Token not found',
  INVALID_TOKEN_MESSAGE: 'Token must be a valid token',
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: tokenErrors.NOT_FOUND_MESSAGE });
    }

    jwt.verify(authorization, secret as string);

    next();
  } catch (error) {
    return res.status(401).json({
      message: tokenErrors.INVALID_TOKEN_MESSAGE,
    });
  }
};
