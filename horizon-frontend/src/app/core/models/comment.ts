
import { User } from './user';
import { Post } from './posts';

export interface Comment {
  id?: number;
 text: string;
  post: number | Post;
  user?:  User;
  created_at?: string;
}