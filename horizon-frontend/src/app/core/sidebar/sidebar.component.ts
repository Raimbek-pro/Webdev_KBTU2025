import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar">
      <nav>
        <a routerLink="/home" routerLinkActive="active">
          <i class="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a routerLink="/search" routerLinkActive="active">
          <i class="fas fa-search"></i>
          <span>Search</span>
        </a>
        <a routerLink="/new-post" routerLinkActive="active">
          <i class="fas fa-plus-square"></i>
          <span>New Post</span>
        </a>
        <a routerLink="/profile" routerLinkActive="active">
          <i class="fas fa-user"></i>
          <span>Your Profile</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background-color: #fff;
      border-right: 1px solid #dbdbdb;
      padding: 20px;
      position: fixed;
      left: 0;
      top: 0;
    }

    nav {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #262626;
      padding: 10px;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    a:hover {
      background-color: #f2f2f2;
    }

    a.active {
      font-weight: bold;
    }

    i {
      font-size: 20px;
    }
  `]
})
export class SidebarComponent {} 