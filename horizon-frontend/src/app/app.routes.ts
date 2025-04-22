import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { aboutGuard } from './home/home.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate:[aboutGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'new-post', component: NewPostComponent,canActivate:[aboutGuard] },
  { path: 'search', component: SearchComponent,canActivate:[aboutGuard] },
  { path: 'profile', component: ProfileComponent, canActivate:[aboutGuard] }
];
