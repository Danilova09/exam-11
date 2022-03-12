import { User } from './user.model';
import { Category } from './category.model';

export interface Item {
  _id: string,
  user: User,
  category: Category,
  title: string,
  description: string,
  image: string,
  price: number,
}
