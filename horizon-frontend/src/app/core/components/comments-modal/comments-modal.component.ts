import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { HomeService } from '../../services/home.service';
import { Comment } from '../../models/comment';
@Component({

  selector: 'app-comments-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <button class="close-btn" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
          <h3>Comments</h3>
        </div>
        <div class="post-preview">
          <img [src]="postImage" alt="Post image">
        </div>
        <div class="comments-section">
          <div class="comments-list">
            <div class="comment" *ngFor="let comment of comments">
              <div class="comment-avatar">
              <img [src]="comment.user?.profile_picture || 'assets/default-avatar.png'" alt="User avatar">
<span class="username">{{comment.user?.username}}</span>
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <span class="username">{{comment.user?.username}}</span>
                  <span class="timestamp">{{comment.created_at | date:'MMM d, yyyy'}}</span>
                </div>
                <p class="comment-text">{{comment.content}}</p>
              </div>
            </div>
          </div>
          <div class="add-comment">
        <input type="text" [(ngModel)]="newComment" placeholder="Add a comment..." />
<button  (click)="addComment()">Post</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      width: 80%;
      max-width: 900px;
      height: 80vh;
      display: flex;
      border-radius: 8px;
      overflow: hidden;
    }

    .modal-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 16px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn {
      position: absolute;
      left: 16px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }

    .post-preview {
      width: 60%;
      background: black;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .post-preview img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .comments-section {
      width: 40%;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #dbdbdb;
    }

    .comments-list {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }

    .comment {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .comment-avatar {
      width: 32px;
      height: 32px;
    }

    .comment-avatar img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .comment-content {
      flex: 1;
    }

    .comment-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .username {
      font-weight: 600;
    }

    .timestamp {
      color: #8e8e8e;
      font-size: 12px;
    }

    .comment-text {
      margin: 0;
    }

    .add-comment {
      padding: 16px;
      border-top: 1px solid #dbdbdb;
      display: flex;
      gap: 8px;
    }

    .add-comment input {
      flex: 1;
      padding: 8px;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
    }

    .add-comment button {
      background: #0095f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }

    .add-comment button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class CommentsModalComponent {
  @Input() selectedPostId: number | null = null;
  @Input() comments: Comment[] = [];
@Input() newComment: string = '';
@Output() newCommentChange = new EventEmitter<string>();
  @Input() isOpen = false;
  @Input() postImage = '';
  @Output() closeModalEvent = new EventEmitter<void>();


    constructor(private homeService: HomeService) {}

  closeModal() {
    this.closeModalEvent.emit();
  }

  addComment() {
    console.log('Post button clicked!');
if (this.selectedPostId && this.newComment.trim()) {
      const commentData = {
        post: this.selectedPostId,
        content: this.newComment

      };

      this.homeService.createComment(commentData)
        .subscribe((comment: Comment) => {
          this.comments.push(comment);
          this.newComment = '';
        });
    }
  }

}
