import { Component, OnInit} from '@angular/core';
import { AuthService } from '../core/services/home.service';
import { Post } from '../core/models/posts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  posts:Post[] = [];
   constructor (private authService: AuthService){

   }
  ngOnInit():void {
    this.authService.getPosts().subscribe((response:Post[])=>{
      this.posts=response;
      console.log(this.posts);
    })
      

  }
}
