import { IRole } from './role.type';

export interface IUser {
  _id?: string;
  name?: string;
  password?: string;
  email?: string;
  phone?: number;
  avatar?: string;
  role?: IRole;
  createdAt?: string;
  updatedAt?: string;
}
