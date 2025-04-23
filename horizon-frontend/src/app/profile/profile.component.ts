import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <div class="avatar-container">
          <img [src]="profilePicture || 'assets/default-avatar.png'" class="profile-avatar" alt="Profile picture">
          <input type="file" #avatarInput (change)="onAvatarChange($event)" accept="image/*" hidden>
          <button class="change-avatar-btn" (click)="avatarInput.click()">
            <i class="fas fa-camera"></i>
          </button>
        </div>
        <div class="profile-info">
          <div class="username-section">
            <h2>{{username}}</h2>
            <button class="edit-btn" (click)="toggleEditMode()">
              {{isEditMode ? 'Cancel' : 'Edit Profile'}}
            </button>
            <button class="logout" (click)="logout()">
            Logout
            </button>
          </div>
          <div class="stats">
            <div class="stat">
              <span class="stat-value">{{postsCount}}</span>
              <span class="stat-label">posts</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{followersCount}}</span>
              <span class="stat-label">followers</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{followingCount}}</span>
              <span class="stat-label">following</span>
            </div>
          </div>
          <div class="bio" *ngIf="!isEditMode">
            <p>{{bio}}</p>
          </div>
          <div class="edit-form" *ngIf="isEditMode">
            <div class="form-group">
              <label>Username</label>
              <input type="text" [(ngModel)]="username">
            </div>
            <div class="form-group">
              <label>Bio</label>
              <textarea [(ngModel)]="bio"></textarea>
            </div>
            <button class="save-btn" (click)="saveProfile()">Save</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 935px;
      margin: 0 auto;
      padding: 20px;
    }

    .profile-header {
      display: flex;
      gap: 100px;
      padding: 20px 0;
    }

    .avatar-container {
      position: relative;
      width: 150px;
      height: 150px;
    }

    .profile-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    .change-avatar-btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #0095f6;
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .profile-info {
      flex: 1;
    }

    .username-section {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    .username-section h2 {
      margin: 0;
      font-size: 28px;
      font-weight: 300;
    }

    .edit-btn {
      background: #f2f2f2;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }
    .logout{
      background: #f2f2f2;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }
    .stats {
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
    }

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-value {
      font-weight: 600;
    }

    .stat-label {
      color: #8e8e8e;
    }

    .bio {
      margin-bottom: 20px;
    }

    .edit-form {
      background: #fafafa;
      padding: 20px;
      border-radius: 8px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
    }

    .form-group textarea {
      height: 100px;
      resize: vertical;
    }

    .save-btn {
      background: #0095f6;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
    }
  `]
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router:Router) {
  }
  username = 'username';
  bio = 'This is my bio';
  postsCount = 0;
  followersCount = 0;
  followingCount = 0;
  isEditMode = false;
  profilePicture: string | null = null;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    this.isEditMode = false;
  }

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profilePicture = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  logout(){
    this.authService.logout()
    this.router.navigate(['/login']);
  }
}
