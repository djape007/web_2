import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  api_route: String = 'http://localhost:52295/api';

  constructor(private http: HttpClient) { }

  public getAllBuses(): Observable<any>{
    return this.http.get(`${this.api_route}/buses`);
  }

  public getBus(busId: string): Observable<any>{
    return this.http.get(`${this.api_route}/buses/${busId}`);
  }
}
