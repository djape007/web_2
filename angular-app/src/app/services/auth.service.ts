import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  api_route: String = 'http://localhost:52295';

  constructor(private http: HttpClient, private _router: Router) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.api_route}/oauth/token`, `username=`+ user.Email +`&password=`+ user.Password + `&grant_type=password`, { 'headers': { 'Content-type': 'x-www-form-urlencoded' } }).pipe(
      map(res => {
        console.log(res.access_token);

        let jwt = res.access_token;

        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        let role = decodedJwtData.role
        localStorage.setItem('token', jwt)
        localStorage.setItem('role', role);
        this._router.navigate(['/home/profile']);
      }),

      catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  } 

  getToken(): any{
    return localStorage.getItem('token');
  }

  getRole(): any{
    return localStorage.getItem('role');
  }
}