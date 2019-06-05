import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  api_route: String = 'http://localhost:52295/api/Lines';

  constructor(private http: HttpClient) { }

  public getLine(id: Guid): Observable<any>{
    return this.http.get(`${this.api_route}/${id}`);
  }
}