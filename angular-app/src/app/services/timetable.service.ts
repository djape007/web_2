import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  api_route: String = 'http://localhost:52295/api/timetables';

  constructor(private http: HttpClient) { }

  public getAllTimetables(): Observable<any>{
    return this.http.get(`${this.api_route}`);
  }
}