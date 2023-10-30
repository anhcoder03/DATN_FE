import { IUser } from './user.type';

export interface IRole {
  _id: string;
  name: string;
  users: IUser[];
}
