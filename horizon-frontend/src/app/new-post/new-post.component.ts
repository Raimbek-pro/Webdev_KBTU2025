import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../core/services/home.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="new-post-container">
      <div class="post-steps">
        <div class="step" [class.active]="currentStep === 1">
          <div class="step-number">1</div>
          <div class="step-label">Choose Photo</div>
        </div>
        <div class="step" [class.active]="currentStep === 2">
          <div class="step-number">2</div>
          <div class="step-label">Title</div>
        </div>
        <div class="step" [class.active]="currentStep === 3">
          <div class="step-number">3</div>
          <div class="step-label">Description</div>
        </div>
      </div>

      <div class="post-content">
        <!-- Step 1: Choose Photo -->
        <div *ngIf="currentStep === 1" class="step-content">
          <div class="upload-area" (click)="fileInput.click()" [class.has-image]="selectedImage">
            <input #fileInput type="file" (change)="onFileSelected($event)" accept="image/*" hidden>
            <img *ngIf="selectedImage" [src]="selectedImage" class="preview-image">
            <div *ngIf="!selectedImage" class="upload-text">
              <i class="fas fa-cloud-upload-alt"></i>
              <p>Click to upload photo</p>
            </div>
          </div>
          <button class="next-btn" [disabled]="!selectedImage" (click)="nextStep()">
            Next
          </button>
        </div>

        <!-- Step 2: Title -->
        <div *ngIf="currentStep === 2" class="step-content">
          <div class="form-group">
            <label>Post Title</label>
            <input type="text" [(ngModel)]="postTitle" placeholder="Enter title">
          </div>
          <div class="step-buttons">
            <button class="back-btn" (click)="prevStep()">Back</button>
            <button class="next-btn" [disabled]="!postTitle" (click)="nextStep()">Next</button>
          </div>
        </div>

        <!-- Step 3: Description -->
        <div *ngIf="currentStep === 3" class="step-content">
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="postDescription" placeholder="Tell us about your post"></textarea>
          </div>
          <div class="step-buttons">
            <button class="back-btn" (click)="prevStep()">Back</button>
            <button class="submit-btn" (click)="submitPost()">Publish</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .new-post-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .post-steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      padding: 0 20px;
    }

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #8e8e8e;
    }

    .step.active {
      color: #0095f6;
    }

    .step-number {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f2f2f2;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
    }

    .step.active .step-number {
      background: #0095f6;
      color: white;
    }

    .step-label {
      font-size: 12px;
    }

    .step-content {
      padding: 20px;
    }

    .upload-area {
      border: 2px dashed #dbdbdb;
      border-radius: 8px;
      padding: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .upload-area:hover {
      border-color: #0095f6;
    }

    .upload-area.has-image {
      border: none;
      padding: 0;
    }

    .preview-image {
      max-width: 100%;
      max-height: 400px;
      border-radius: 8px;
    }

    .upload-text {
      color: #8e8e8e;
    }

    .upload-text i {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #dbdbdb;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-group textarea {
      height: 120px;
      resize: vertical;
    }

    .step-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .back-btn {
      background: #f2f2f2;
      color: #262626;
    }

    .next-btn,
    .submit-btn {
      background: #0095f6;
      color: white;
    }

    .back-btn:hover {
      background: #e6e6e6;
    }

    .next-btn:hover,
    .submit-btn:hover {
      background: #0081d6;
    }
  `]
})
export class NewPostComponent {
  currentStep = 1;
  selectedImage: string | null = null;
  postTitle = '';
  postDescription = '';
  imageFile: File | null = null;
  constructor(private homeService: HomeService) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file; // store the actual file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitPost() {
    if (!this.imageFile) {
      console.error('No file selected');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', this.imageFile); 
    formData.append('title', this.postTitle);
    formData.append('description', this.postDescription);
  
    this.homeService.createPost(formData).subscribe(
      (response) => {
        console.log('Post submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting post:', error);
      }
    );
  }
} 