import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { UserLogin } from 'src/models/user-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _service: MainService) { }

  ngOnInit() {
  }

  public login(usrname: string, pass: string){
    var user = new UserLogin(usrname, pass);
    this._service.login(user)
    .subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }

}
