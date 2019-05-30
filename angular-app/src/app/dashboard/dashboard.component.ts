import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { UserLogin } from 'src/models/user-login';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Line } from 'src/models/line';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  picked_day : string;
  picked_type : string;
  
  lines = [{'LineCode' : '11a'}, {'LineCode' : '4a'},{'LineCode' : '7b'}, {'LineCode' : '5a'}]

  myForm = this._fb.group({
    type:'',
    line: this.lines[0].LineCode,
    day:''
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.btnDayClick('radni');
    this.btnTypeClick('gradski');
  }
  
  save() {
    this.myForm.setValue({  
      day: this.picked_day,
      type: this.picked_type,  
      line: this.myForm.get('line').value
    });
    console.log(this.myForm.value);
  }

  public btnDayClick(day: string){
    let radni = document.getElementById('radni');
    radni.className = 'square_btn';
    let sub = document.getElementById('subota');
    sub.className = 'square_btn';
    let ned = document.getElementById('nedelja');
    ned.className = 'square_btn';
    
    if(day == 'radni'){
      radni.className = 'square_btn_active';
      this.picked_day = 'radni';
    }
    else if(day == 'subota'){
      sub.className = 'square_btn_active';
      this.picked_day = 'subota';     
    }
    else if(day == 'nedelja'){
      ned.className = 'square_btn_active'; 
      this.picked_day = 'nedelja';
    }
  }

  public btnTypeClick(type: string){
    let gradski = document.getElementById('gradski');
    gradski.className = 'square_btn';
    let prigradski = document.getElementById('prigradski');
    prigradski.className = 'square_btn';
    
    if(type == 'gradski'){
      gradski.className = 'square_btn_active';
      this.picked_type = 'gradski';
    }
    else if(type == 'prigradski'){
      prigradski.className = 'square_btn_active';
      this.picked_type = 'prigradski';
    }
  }
  // public login(usrname: string, pass: string){
  //   var user = new UserLogin(usrname, pass);
  //   this._service.login(user)
  //   .subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

}
