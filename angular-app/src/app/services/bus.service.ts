import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  api_route: String = 'http://localhost:52295/api/Buses';

  constructor(private http: HttpClient) { }

  public getBuses(): Observable<any>{
    return this.http.get(`${this.api_route}`);
  }
  
  public getBusesWithLine(): Observable<any>{
    return this.http.get(`${this.api_route}/WithLine`);
  }
}