import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../core/services/search.service';
import { Post } from '../core/models/posts';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-box">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          (input)="onSearch()"
          placeholder="Search posts..."
        >
        <i class="fas fa-search"></i>
      </div>

      <div class="search-results" *ngIf="searchResults.length > 0">
        <div class="post" *ngFor="let post of searchResults">
          <div class="post-header">
            <div class="profile-pic"></div>
            <span class="username">{{post.user?.username}}</span>
          </div>
          <img [src]="post.image" class="post-image" alt="Post image">
          <div class="post-info">
            <p class="caption">
              <strong>{{post.user?.username}}</strong> {{post.caption}}
            </p>
            <p class="timestamp">{{post.created_at | date:'MMM d, yyyy'}}</p>
          </div>
        </div>
      </div>

      <div class="no-results" *ngIf="searchQuery && searchResults.length === 0">
        No posts found matching "{{searchQuery}}"
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .search-box {
      position: relative;
      margin-bottom: 20px;
    }

    .search-box input {
      width: 100%;
      padding: 10px 40px 10px 10px;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      font-size: 16px;
    }

    .search-box i {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #8e8e8e;
    }

    .post {
      background: white;
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .post-header {
      display: flex;
      align-items: center;
      padding: 14px 16px;
    }

    .profile-pic {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 12px;
      background-color: #000;
    }

    .username {
      font-weight: 600;
      color: #262626;
    }

    .post-image {
      width: 100%;
      max-height: 600px;
      object-fit: cover;
    }

    .post-info {
      padding: 0 16px 16px;
    }

    .caption {
      margin-bottom: 8px;
    }

    .timestamp {
      color: #8e8e8e;
      font-size: 10px;
      text-transform: uppercase;
    }

    .no-results {
      text-align: center;
      color: #8e8e8e;
      padding: 20px;
    }
  `]
})
export class SearchComponent {
  searchQuery = '';
  searchResults: Post[] = [];

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.searchPosts(this.searchQuery).subscribe(results => {
      this.searchResults = results;
    });
  }
} 