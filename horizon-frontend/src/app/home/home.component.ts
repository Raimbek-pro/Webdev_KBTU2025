import {Component, OnInit} from '@angular/core';
import {HomeService} from '../core/services/home.service';
import {Post} from '../core/models/post';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommentsModalComponent} from '../core/components/comments-modal/comments-modal.component';
import {Comment} from '../core/models/comment';
import {LikeService} from '../core/services/like.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentsModalComponent],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  selectedPostComments: Comment[] = [];
  selectedPostId: number | null = null;
  newComment: string = '';
  isCommentsModalOpen = false;
  selectedPostImage = '';

  constructor(private homeService: HomeService,
  private likeService: LikeService) {
  }

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
      console.log(comments);
      this.selectedPostComments = comments;
    });
  }

  submitComment() {
    if (this.selectedPostId && this.newComment.trim()) {
      const commentData = {
        post: this.selectedPostId,
        content: this.newComment

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

  onToggleLike(post: Post) {
    this.likeService.toggleLike(post.id).subscribe(res => {
      post.liked = res.liked;
      post.likes_count = res.likes_count;
    });
  }

}
