import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {
    constructor(private router : Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  
        return this.verifyLogin(url);
    }

    verifyLogin(url: string) : boolean{
        if(!this.isLoggedIn()){
            this.router.navigate(['/home/login']);
            return false;
        }
        else if(this.isLoggedIn()){
            return true;
        }
    }
    public isLoggedIn(): boolean{
        let status = false;
        var token = localStorage.getItem("token");
        var isLoggedIn = localStorage.getItem('isLoggedIn');

        //var currentDate = new Date(Date.now());
        //var expDate = new Date(expDateStr);
        // if(isLoggedIn == "true" && token && currentDate < expDate){
        //   status = true;
        // }
        //treba porediti i da li je expired
        if(isLoggedIn && token)
            status = true;

        return status;
    }
}