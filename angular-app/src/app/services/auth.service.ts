import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  } 

  getToken(): any{
    return localStorage.getItem('token');
  }

  getIsLoggedIn(): any{
    return localStorage.getItem('isLoggedIn');
  }
}