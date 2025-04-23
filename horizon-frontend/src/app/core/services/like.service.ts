import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ToggleLikeResponse {
  liked: boolean;
  likes_count: number;
}

@Injectable({ providedIn: 'root' })
export class LikeService {
  constructor(private http: HttpClient) {}

  toggleLike(postId: number): Observable<ToggleLikeResponse> {
    const token = localStorage.getItem('token');
    console.log('Raw token:', token); 
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Authorization header:', headers.get('Authorization')); 
    return this.http.post<ToggleLikeResponse>(
      `http://localhost:8000/api/home/posts/${postId}/like-toggle/`,
      {},
      { headers }
    );
  }
}