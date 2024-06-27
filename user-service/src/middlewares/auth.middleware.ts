import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { STATUS_CODES } from '../constants/status-codes';
import { User } from '../models/user.model';
import { USER } from '../constants/error-messages';
import jwt from 'jsonwebtoken';

export const AuthMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.slice(7, authorizationHeader.length);
      const userDetails: any = jwt.verify(token, process.env.JWT_SECRET ?? '');
      const user = await User.findOne({ email: userDetails.email });
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(STATUS_CODES.NotFound)
          .json({ message: USER.USER_NOT_FOUND });
      }
    } else {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ message: USER.USER_NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ message: USER.USER_SIGNIN_FAILED });
  }
};
