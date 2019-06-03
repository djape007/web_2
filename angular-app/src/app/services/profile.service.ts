import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  api_route: String = 'http://localhost:52295';

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<any>{
    return this.http.post(`${this.api_route}/oauth/token`,`username=${user.Email}&password=${user.Password}&grant_type=password`, { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}});
  }

  public register(user: User): Observable<any>{
    return this.http.post(`${this.api_route}/api/users/register`, `email=${user.Email}&Password=${user.Password}&DateOfBirth=2001-10-10&Address=${user.Address}&Name=${user.Name}&Surame=${user.Surname}&Type=${user.Type}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}} )
  }
}