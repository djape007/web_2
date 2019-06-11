import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Line } from 'src/models/line';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  api_route: String = 'http://localhost:52295/api/Lines';

  constructor(private http: HttpClient) { }

  public getLine(id: string): Observable<any>{
    return this.http.get(`${this.api_route}/${id}`);
  }

  public editLine(line: Line): Observable<any>{
    return this.http.put(`${this.api_route}/${line.Id}`, `Id=${line.Id}&Direction=${line.Direction}&PointLinePaths=${line.PointLinePaths}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}} );
  }
}