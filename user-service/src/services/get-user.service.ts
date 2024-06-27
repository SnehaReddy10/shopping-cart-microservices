import { Request, Response } from 'express';

class UserRequest extends Request {
  user: any;
}

export const GetUser = async (req: UserRequest, res: Response) => {
  return req.user;
};
