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
    return this.http.post<ToggleLikeResponse>(
      `http://localhost:8000/api/posts/${postId}/like/`,
      {},
      {withCredentials: true}
    );
  }
}
