import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../models/user';
import { Post } from '../models/posts';
import { Comment } from '../models/comment'
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private BASE_URL = 'http://localhost:8000/api/home'

  constructor(private http: HttpClient) {
  }

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.BASE_URL)
  }
  createPost(postData: any): Observable<Post> {
    const formData = new FormData();

    // Append the content and image
    formData.append('content', postData.content);

    if (postData.image) {
      formData.append('image', postData.image, postData.image.name); // Make sure to include the image with its name
    }
    return this.http.post<Post>(`${this.BASE_URL}/create`, formData).pipe(
      tap(response => {
        console.log('Post created successfully', response);
      })
    );
  }
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments?post=${postId}`);
  }

  
  createComment(commentData: { post: number, content: string, user?: number }): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/createcomment`, commentData).pipe(
      tap(response => {
        console.log('Comment created successfully', response);
      })
    );
  }
}
