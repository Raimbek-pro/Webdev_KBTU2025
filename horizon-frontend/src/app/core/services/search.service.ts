import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private testPosts: Post[] = [
    {
      id: 1,
      user: {
        id: 1,
        username: 'user1',
        first_name: 'John',
        last_name: 'Doe'
      },
      image: 'https://picsum.photos/600/600?random=1',
      caption: 'Beautiful sunset at the beach #sunset #beach',
      content: 'Beautiful sunset at the beach #sunset #beach',
      created_at: new Date().toISOString(),
      likes_count: 42,
      comments_count: 5
    },
    {
      id: 2,
      user: {
        id: 2,
        username: 'user2',
        first_name: 'Jane',
        last_name: 'Smith'
      },
      image: 'https://picsum.photos/600/600?random=2',
      caption: 'Morning coffee and coding #programming #coffee',
      content: 'Morning coffee and coding #programming #coffee',
      created_at: new Date().toISOString(),
      likes_count: 28,
      comments_count: 3
    },
    {
      id: 3,
      user: {
        id: 3,
        username: 'user3',
        first_name: 'Bob',
        last_name: 'Johnson'
      },
      image: 'https://picsum.photos/600/600?random=3',
      caption: 'New project in progress #webdev #coding',
      content: 'New project in progress #webdev #coding',
      created_at: new Date().toISOString(),
      likes_count: 15,
      comments_count: 2
    }
  ];

  searchPosts(query: string): Observable<Post[]> {
    if (!query.trim()) {
      return of([]);
    }

    const results = this.testPosts.filter(post =>
      post.caption.toLowerCase().includes(query.toLowerCase())
    );

    return of(results);
  }
}
