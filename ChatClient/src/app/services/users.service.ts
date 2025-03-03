import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {backendApiUrl} from '../models/config';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {CreateUserRequest} from '../models/CreateUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getCurrentUser(): Observable<User | null> {
    const login = localStorage.getItem('login');
    console.log('current user login is ', login);
    if (!login) {
      return of(null);
    }
    return this.http
      .get<User>(`${backendApiUrl}/users/${login}`)
      .pipe(
        tap((response) => response),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  setCurrentUser(login: string) {
    console.log('current user login setting to ', login);
    localStorage.setItem('login', login);
  }

  createUser(login: string): Observable<string | null> {
    const userDto = new CreateUserRequest(login);
    return this.http
      .post<string>(`${backendApiUrl}/users`, userDto)
      .pipe(
        map(response => {
          return response
        }),
        tap(login => {
          if (login) {
            console.log('User created with login:', login);
          }
        }),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  getUser(login: string): Observable<User | null> {
    return this.http
      .get<User>(`${backendApiUrl}/users/${login}`)
      .pipe(
        tap((response) => response),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  getUsers(): Observable<User[] | null> {
    return this.http
      .get<User[]>(`${backendApiUrl}/users`)
      .pipe(
        tap((response) => response),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/']);
  }
}
