
import { User } from './user';
import { Post } from './posts';

export interface Comment {
  id?: number;
  content: string;
  post: number | Post;
  user?: number | User;
  created_at?: string;
}