import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { UserLogin } from 'src/models/user-login';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Line } from 'src/models/line';
import { Timetable } from 'src/models/timetable';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  picked_day: string;
  picked_type: string;
  
  timetables = new Array<Timetable>();
  ttModel = new Array<Timetable>();

  ttJson: any;

  myForm = this._fb.group({
    type:'',
    line:'',
    day:''
  });

  constructor(private _fb: FormBuilder, private _sevice: MainService) { }

  ngOnInit() {
    this.btnDayClick('radni');
    this.btnTypeClick('gradski');
    this._sevice.getAllTimetables()
      .subscribe(
        data => {
          this.timetables = data;
          this.timetables.forEach(x=> x.Line.DisplayName = `${x.Line.LineCode} ${x.Line.Direction}`)
          this.ttModel = this.getGradski();
        },
        err => {
          console.log(err);
        }
      )
  }
  
  save() {
    this.myForm.setValue({  
      day: this.picked_day,
      type: this.picked_type,  
      line: this.myForm.get('line').value
    });

    var selectedLineCode = this.myForm.get('line').value;
    var helpJson = JSON.parse(this.timetables.find(x => x.Line.LineCode == selectedLineCode).Times);
    if(this.picked_day == "Radni_dan")
      this.ttJson = helpJson['Radni_dan'];
    else if(this.picked_day == "Subota")
      this.ttJson = helpJson['Subota'];
    else if(this.picked_day == "Nedelja")
      this.ttJson = helpJson['Nedelja'];

    console.log(this.ttJson);
    //console.log(this.myForm.value);
  }
  
  getPrigradski(): Array<Timetable>{
    return this.timetables
    .filter(
      x => (Number)(x.Line.LineCode.replace('A','').replace('B','')) > 20
    ).sort(
      (x,y) => (Number)(x.Line.LineCode.replace('A','').replace('B','')) - (Number)(y.Line.LineCode.replace('A','').replace('B',''))
    );
  }

  getGradski(): Array<Timetable>{
    return this.timetables
    .filter(
      x => (Number)(x.Line.LineCode.replace('A','').replace('B','')) < 20
    ).sort(
      (x,y) => (Number)(x.Line.LineCode.replace('A','').replace('B','')) - (Number)(y.Line.LineCode.replace('A','').replace('B',''))
    );
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
      this.picked_day = 'Radni_dan';
    }
    else if(day == 'subota'){
      sub.className = 'square_btn_active';
      this.picked_day = 'Subota';     
    }
    else if(day == 'nedelja'){
      ned.className = 'square_btn_active'; 
      this.picked_day = 'Nedelja';
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
      this.ttModel = this.getGradski();
    }
    else if(type == 'prigradski'){
      prigradski.className = 'square_btn_active';
      this.picked_type = 'prigradski';
      this.ttModel = this.getPrigradski();
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
