import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  posts: Post[] = [];

  private BASE_URL = 'http://localhost:8000/api/home'

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.BASE_URL)
  }

  searchPosts(query: string): Observable<Post[]> {
    if (!query.trim()) {
      return of([]);
    }

    this.getPosts().subscribe(
      posts => this.posts = posts
    );

    const results = this.posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    return of(results);
  }
}
