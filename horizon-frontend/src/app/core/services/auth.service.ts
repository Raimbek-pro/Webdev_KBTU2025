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

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(this.BASE_URL + '/login', credentials, {withCredentials:true}).pipe(
      tap((response) => {
        console.log('Login response:', response);
        localStorage.setItem('token', response.token);
        // После успешного входа получаем данные пользователя
        this.getCurrentUser().subscribe(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        });
      })
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.BASE_URL + '/user', {withCredentials: true}).pipe(
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  getStoredUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // true if token exists
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.http.post(this.BASE_URL + "/logout", "", {withCredentials: true}).subscribe();
  }
}
