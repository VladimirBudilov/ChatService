import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {bacckendUrl} from '../models/config';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getCurrentUser(): Observable<User | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return of(null);
    }
    return this.http
      .get<User>(`${bacckendUrl}/users/${userId}`)
      .pipe(
        tap((response) => response),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  setCurrentUser(userId: string) {
    localStorage.setItem('userId', userId);
  }

createUser(login: string): Observable<string | null> {
  return this.http
    .post<{ id: string }>(`${bacckendUrl}/users`, login)
    .pipe(
      map(response => response?.id || null),
      catchError((error) => {
        console.error('Ошибка запроса:', error);
        return of(null);
      })
    );
}

  getUser(login: string): Observable<User | null> {
    return this.http
      .get<User>(`${bacckendUrl}/users/${login}`)
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
      .get<User[]>(`${bacckendUrl}/users`)
      .pipe(
        tap((response) => response),
        catchError((error) => {
          console.error('Ошибка запроса:', error);
          return of(null);
        })
      );
  }

  logout() {
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
