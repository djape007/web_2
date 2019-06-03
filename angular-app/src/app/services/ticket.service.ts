import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  api_route: String = 'http://localhost:52295/api';

  constructor(private http: HttpClient) { }

  public getAllPriceHistories(): Observable<any>{
    return this.http.get(`${this.api_route}/PriceHistories`);
  }

  public getAllCoefficients(): Observable<any>{
    return this.http.get(`${this.api_route}/Coefficients`);
  }
}