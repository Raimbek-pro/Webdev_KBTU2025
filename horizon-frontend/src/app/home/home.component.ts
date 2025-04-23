import { Component, OnInit } from '@angular/core';
import { HomeService } from '../core/services/home.service';
import { Post } from '../core/models/posts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsModalComponent } from '../core/components/comments-modal/comments-modal.component';
import { Comment } from '../core/models/comment'; 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentsModalComponent],
  template: `
    <div class="feed-container">
      <div class="posts" *ngFor="let post of posts">
        <div class="post">
          <div class="post-header">
            <div class="profile-pic"></div>
            <span class="username">{{post.user?.username}}</span>
          </div>
          <img [src]="" class="post-image" alt="Post image">
          <div class="post-actions">
            <button class="action-btn">
              <i class="far fa-heart"></i>
            </button>
            <button class="action-btn" (click)="openComments(post)">
              <i class="far fa-comment"></i>
            </button>
          </div>
          <div class="post-info">
            <p class="likes">{{post.likes_count}} likes</p>
            <p class="caption">
              <strong>{{post.user?.username}}</strong> {{post.caption}}
            </p>
            <p class="comments" *ngIf="post.comments_count > 0" (click)="openComments(post)">
              View all {{post.comments_count}} comments
            </p>
            <p class="timestamp">{{post.created_at | date:'MMM d, yyyy'}}</p>
          </div>
        </div>
      </div>
    </div>

<app-comments-modal 
  [isOpen]="isCommentsModalOpen"
  [postImage]="selectedPostImage"
  [comments]="selectedPostComments"
  [newComment]="newComment"
 [selectedPostId]="selectedPostId"
  (newCommentChange)="newComment = $event"
  (commentSubmit)="submitComment()"
  (closeModalEvent)="closeCommentsModal()">
</app-comments-modal>
  `,
  styles: [`
    .feed-container {
      max-width: 600px;
      margin: 0 auto;
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

    .post-actions {
      padding: 8px 16px;
      display: flex;
      gap: 16px;
    }

    .action-btn {
      background: none;
      border: none;
      padding: 8px;
      cursor: pointer;
    }

    .action-btn i {
      font-size: 24px;
      color: #262626;
    }

    .post-info {
      padding: 0 16px 16px;
    }

    .likes {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .caption {
      margin-bottom: 8px;
    }

    .comments {
      color: #8e8e8e;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .timestamp {
      color: #8e8e8e;
      font-size: 10px;
      text-transform: uppercase;
    }
  `]
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  selectedPostComments: Comment[] = [];
selectedPostId: number | null = null;
newComment: string = '';
  isCommentsModalOpen = false;
  selectedPostImage = '';

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getPosts().subscribe((response: Post[]) => {
      this.posts = response;
      console.log(this.posts);
    });
  }

  openComments(post: Post) {
    this.selectedPostImage = post.image || '';
    this.selectedPostId = post.id;
    this.isCommentsModalOpen = true;
    
    this.homeService.getComments(post.id).subscribe((comments: Comment[]) => {
      this.selectedPostComments = comments;
    });
  }

  submitComment() {
    if (this.selectedPostId && this.newComment.trim()) {
      const commentData = {
        post: this.selectedPostId,
        text: this.newComment
     
      };
  
      this.homeService.createComment(commentData)
        .subscribe((comment: Comment) => {
          this.selectedPostComments.push(comment);
          this.newComment = '';
        });
    }
  }
  closeCommentsModal() {
    this.isCommentsModalOpen = false;
    this.selectedPostImage = '';
    this.selectedPostId = null;
    this.selectedPostComments = [];
    this.newComment = '';
  }
  getImageUrl(imagePath: string): string {
    return imagePath ? `http://localhost:8000/media/${imagePath}` : '';
  }
}
