import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/models/user-login';
import { Timetable } from 'src/models/timetable';
import { map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  api_route: String = 'http://localhost:52295';

  constructor(private http: HttpClient) { }

  // public getAllBuses(): Observable<any>{
  //   return this.http.get(`${this.api_route}/api/buses`);
  // }

  // public getBus(busId: string): Observable<any>{
  //   return this.http.get(`${this.api_route}/api/buses/${busId}`);
  // }

  public login(userLogin: UserLogin): Observable<any>{
    return this.http.post(`${this.api_route}/oauth/token`,`username=${userLogin.username}&password=${userLogin.password}&grant_type=password`, { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}});
  }

  public getAllTimetables(): Observable<any>{
    return this.http.get(`${this.api_route}/api/timetables`);
  }
}
