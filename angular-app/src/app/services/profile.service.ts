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

  public register(user: User, dobString: string): Observable<any>{
    return this.http.post(`${this.api_route}/api/users/register`, `email=${user.Email}&Password=${user.Password}&DateOfBirth=${dobString}&Address=${user.Address}&Name=${user.Name}&Surname=${user.Surname}&Type=${user.Type}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}});
  }

  public getUser(id: string): Observable<any>{
    return this.http.get(`${this.api_route}/api/Users/${id}`);
  }

  public editUser(user: User, dobString: string): Observable<any>{
    return this.http.put(`${this.api_route}/api/Users/${user.Id}`, `Id=${user.Id}&DateOfBirth=${dobString}&Address=${user.Address}&Name=${user.Name}&Surname=${user.Surname}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}} );
  }

  public changePassword(oldpass: string, newpass: string, reppass: string): Observable<any>{
    return this.http.post(`${this.api_route}/api/Users/ChangePassword`, `OldPassword=${oldpass}&NewPassword=${newpass}&ConfirmPassword=${reppass}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}});
  }
}