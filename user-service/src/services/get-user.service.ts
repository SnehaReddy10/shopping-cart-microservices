import { Request, Response } from 'express';
import { MapUser } from '../mapper/user.mapper';
import { User } from '../interfaces/user.interface';

export const GetUser = async (req: any, res: Response) => {
  const mappedUser: User = MapUser(req.user);
  return res.json({ user: mappedUser });
};
