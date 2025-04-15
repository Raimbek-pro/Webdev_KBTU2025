import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../models/user';
import { Post } from '../models/posts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8000/api/home'

  constructor(private http: HttpClient) {
  }

 

  getPosts():Observable<Post[]>{
    return this.http.get<Post[]>(this.BASE_URL)
  }

}
