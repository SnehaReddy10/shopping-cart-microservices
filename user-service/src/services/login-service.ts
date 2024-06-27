import { Request, Response } from 'express';
import { z } from 'zod';
import { STATUS_CODES } from '../constants/status-codes';
import { User } from '../models/user.model';
import { USER } from '../constants/error-messages';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, USER.PASSWORD_MIN_LENGTH_8),
});

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { success, data, error } = loginUserSchema.safeParse(req.body);

  if (!success) {
    res.status(STATUS_CODES.BadRequest).json(error.errors);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ message: USER.USER_NOT_FOUND });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      existingUser.password ?? ''
    );

    if (!isPasswordValid) {
      res.status(STATUS_CODES.BadRequest).json({ message: '' });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' }
    );

    res.status(STATUS_CODES.Success).json({ token });
  } catch (err) {
    res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ message: USER.USER_SIGNIN_FAILED });
  }
};
