import { User } from '../interfaces/user.interface';

export const MapUser = (user: any) => {
  const mappedUser: User = {
    id: user._id,
    age: user.age,
    username: user.username,
    email: user.email,
  };
  return mappedUser;
};
