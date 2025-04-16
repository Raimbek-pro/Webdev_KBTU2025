import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8000/api/auth'

  constructor(private http: HttpClient) {
  }
  isLoggedIn = false;

  register(credentials: {
    username: string,
    password: string,
    first_name: string,
    last_name: string
  }): Observable<User> {
    return this.http.post<User>(this.BASE_URL + '/register', credentials, {withCredentials: true}).pipe();
  }

  login(credentials: { username: string, password: string }): Observable<string> {
    this.isLoggedIn=true
    return this.http.post<string>(this.BASE_URL + '/login', credentials, {withCredentials:true}).pipe();
    
  }
}
