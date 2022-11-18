import { NextFunction, Request, Response } from 'express';
import statusCodes from '../helpers/statusCodes';
import { parseCommandLine } from 'typescript';
import { z }from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8).regex(/^(?=.*\d)(?=.*[A-Z])/),
});

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
    };
  
    const result = userSchema.safeParse(newUser);

    if (!result.success) throw result.error;

    next();
  } catch (error) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error });
  }
};
