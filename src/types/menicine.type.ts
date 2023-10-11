import { ICategory } from "./category.type";
import { IUser } from "./user.type";

export interface IMedicine {
  _id: string;
  name: string;
  quantity: number;
  price_import: number;
  price: number;
  dateOfManufacture: string;
  dateExpiry: string;
  uses: string;
  unit_import: string;
  unit_selling: string;
  categoryId: ICategory;
  creator: IUser;
  origin: string;
  ingredient: string;
  how_using: string;
  status: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
