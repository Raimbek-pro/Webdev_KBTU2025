import {User} from './user';
import {Post} from './post';

export interface Comment {
  id?: number;
  content: string;
  post: number | Post;
  user?: User;
  created_at?: string;
}
