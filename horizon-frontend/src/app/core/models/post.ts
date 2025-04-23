import { User } from "./user";

export interface Post {
    id: number,
    user: User,
    content: string,
    created_at: string,
    image?: string,
    likes_count: number,
    caption: string,
    comments_count: number
}