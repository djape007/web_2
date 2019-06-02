import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MainService } from '../services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timetable } from 'src/models/timetable';
import { HomeComponent } from '../home/home.component';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  picked_day: string;
  picked_type: string;
  timetables = new Array<Timetable>();
  timetabletModel = new Array<Timetable>();
  timetableJson = Array<string>();
  myForm: FormGroup;
  message: string;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
     private _sevice: MainService, private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this._parent.prikaziLeviMeni();

    this.myForm = this._formBuilder.group({
      day: ['', Validators.required],
      type: ['', Validators.required],
      line: ['', Validators.required]
    });

    this._sevice.getAllTimetables()
      .subscribe(
        data => {
          this.timetables = data;
          this.timetables.forEach(x=> x.Line.DisplayName = `${x.Line.LineCode} ${x.Line.Direction}`)
          this.timetabletModel = this.getGradski();
          this.btnDayClick('radni');
          this.btnTypeClick('gradski');
        },
        err => {
          console.log(err);
        }
      )
  }

  get f() { return this.myForm.controls; }
  
  save() {

    this.myForm.setValue({  
      day: this.picked_day,
      type: this.picked_type,  
      line: this.myForm.get('line').value
    });

    this.message = '';

    if (this.myForm.invalid) {
      this.message = "Izaberite zeljenu liniju!";
      this.timetableJson = new Array<string>();
      return;
    }

    var selectedLineCode = this.f.line.value;
    var timesJson = JSON.parse(this.timetables.find(x => x.Line.LineCode == selectedLineCode).Times);
    var selectedDayTimesJson = new Array<string>();
    if(this.picked_day == "Radni_dan")
      selectedDayTimesJson = timesJson['Radni_dan'];
    else if(this.picked_day == "Subota")
      selectedDayTimesJson = timesJson['Subota'];
    else if(this.picked_day == "Nedelja")
      selectedDayTimesJson = timesJson['Nedelja'];

    this.timetableJson = new Array<string>();
    var startTime = selectedDayTimesJson[0].split(':')[0];
    var str = '';
    for (let time of selectedDayTimesJson) {
      if(time.split(':')[0] == startTime){
        str = str.concat(`${time}\t`);
      }
      else{
        startTime = time.split(':')[0];
        this.timetableJson.push(str);
        str = '';
        str = str.concat(`${time}\t`);
      }
    }
    this.timetableJson.push(str);
    //this._parent.removeOverlay();
  }
  
  getPrigradski(): Array<Timetable>{
    return this.timetables
    .filter(
      x => (Number)(x.Line.LineCode.replace('A','').replace('B','')) > 20
    ).filter(
      x => x.Times.includes(this.picked_day)
    ).sort(
      (x,y) => (Number)(x.Line.LineCode.replace('A','').replace('B','')) - (Number)(y.Line.LineCode.replace('A','').replace('B',''))
    );
  }

  getGradski(): Array<Timetable>{
    return this.timetables
    .filter(
      x => (Number)(x.Line.LineCode.replace('A','').replace('B','')) < 20
    ).filter(
      x => x.Times.includes(this.picked_day)
    )
    .sort(
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
      this.myForm.reset();
    }
    else if(day == 'subota'){
      sub.className = 'square_btn_active';
      this.picked_day = 'Subota';   
      this.myForm.reset();  
    }
    else if(day == 'nedelja'){
      ned.className = 'square_btn_active'; 
      this.picked_day = 'Nedelja';
      this.myForm.reset();
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
      this.timetabletModel = this.getGradski();
      this.myForm.reset();
    }
    else if(type == 'prigradski'){
      prigradski.className = 'square_btn_active';
      this.picked_type = 'prigradski';
      this.timetabletModel = this.getPrigradski();
      this.myForm.reset();
    }
  }
}
