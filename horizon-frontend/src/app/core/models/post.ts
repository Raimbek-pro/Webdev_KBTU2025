import {User} from "./user";

export interface Post {
  id: number,
  user: User,
  title: string,
  content: string,
  created_at: string,
  image?: string,
  likes_count: number,
  comments_count: number
}
