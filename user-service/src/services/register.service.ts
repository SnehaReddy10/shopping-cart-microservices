import { Request, Response } from 'express';
import { z } from 'zod';
import { STATUS_CODES } from '../constants/status-codes';
import { User } from '../models/user.model';
import { USER } from '../constants/error-messages';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUserSchema = z
  .object({
    username: z.string({ message: '' }),
    age: z.number(),
    email: z.string().email(),
    password: z.string().min(8, USER.PASSWORD_MIN_LENGTH_8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: USER.PASSWORD_SHOULD_MATCH,
    path: ['confirmPassword'],
  });

export const RegisterUser = async (req: Request, res: Response) => {
  const { username, email, age, password } = req.body;

  const { success, data, error } = registerUserSchema.safeParse(req.body);

  if (!success) {
    res.status(STATUS_CODES.BadRequest).json(error.errors);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(STATUS_CODES.BadRequest)
        .json({ message: USER.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      age: age,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET ?? '',
      { expiresIn: '1h' }
    );
    res.status(STATUS_CODES.Created).json({ token });
  } catch (err) {
    res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ message: USER.USER_REGISTRATION_FAILED });
  }
};
