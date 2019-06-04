import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

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

  public buyTicket(productTypeId: Guid): Observable<any>{
    return this.http.post(`${this.api_route}/SoldTickets/Buy/${productTypeId}`,'');
  }
}