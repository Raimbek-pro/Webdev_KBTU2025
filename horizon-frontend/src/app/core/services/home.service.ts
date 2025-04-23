import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment'

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private BASE_URL = 'http://localhost:8000/api/home'

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.BASE_URL)
  }

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.BASE_URL}/create`, formData, {withCredentials: true}).pipe(
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
