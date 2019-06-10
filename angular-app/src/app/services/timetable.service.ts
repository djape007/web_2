import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timetable } from 'src/models/timetable';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  api_route: String = 'http://localhost:52295/api/timetables';

  constructor(private http: HttpClient) { }

  public getAllTimetables(): Observable<any>{
    return this.http.get(`${this.api_route}`);
  }

  public editTimetable(timetable: Timetable): Observable<any>{
    return this.http.put(`${this.api_route}/${timetable.Id}`, `Id=${timetable.Id}&Times=${timetable.Times}`,  { "headers" : {'Content-type' : 'application/x-www-form-urlencoded'}} );
  }
}