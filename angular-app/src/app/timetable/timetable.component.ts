import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timetable } from 'src/models/timetable';
import { HomeComponent } from '../home/home.component';
import { TimetableService } from '../services/timetable.service';
import { LineService } from '../services/line.service';

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
  selectedLineName: string = "";
  myForm: FormGroup;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
     private _sevice: TimetableService,private _lineService: LineService, private _formBuilder: FormBuilder) { }

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
    this.f.day.setValue(this.picked_day);
    this.f.type.setValue(this.picked_type);

    if (this.myForm.invalid) {
      this.timetableJson = new Array<string>();
      return;
    }

    let selectedLineCode = this.f.line.value;
    let selectedTimeTableObject = this.timetables.find(x => x.Line.LineCode == selectedLineCode);
    this.selectedLineName = selectedTimeTableObject.Line.DisplayName;

    this.displayLineOnMap(selectedTimeTableObject.Line.Id);

    let timesJson = JSON.parse(selectedTimeTableObject.Times);
    let selectedDayTimesJson = new Array<string>();
    if(this.picked_day == "Radni_dan")
      selectedDayTimesJson = timesJson['Radni_dan'];
    else if(this.picked_day == "Subota")
      selectedDayTimesJson = timesJson['Subota'];
    else if(this.picked_day == "Nedelja")
      selectedDayTimesJson = timesJson['Nedelja'];

    this.timetableJson = new Array<string>();

    let polasciPoSatima = {};
    selectedDayTimesJson.forEach(
      (item, indeks) => {
        let satMinut = item.split(":");
        if (!(satMinut[0] in polasciPoSatima)) {
          polasciPoSatima[satMinut[0]] = new Array<string>();
        }

        polasciPoSatima[satMinut[0]].push(satMinut[1]);
      });
    
    for (let sat = 4; sat < 24; sat++) {
      let satStr = sat.toString().padStart(2, '0');
      if (satStr in polasciPoSatima) {
        let prikazJednogSata = satStr+"|" + polasciPoSatima[satStr].join(",");
        this.timetableJson.push(prikazJednogSata);
      }
    }

    /* stari ispis
    let startTime = selectedDayTimesJson[0].split(':')[0];
    let jedanSat = ''; //06:05 06:15 06:30 06:45 06:57

    for (let time of selectedDayTimesJson) {
      if(time.split(':')[0] == startTime){
        jedanSat = jedanSat.concat(`${time}\t`);
      }
      else{
        startTime = time.split(':')[0];
        this.timetableJson.push(jedanSat);
        jedanSat = '';
        jedanSat = jedanSat.concat(`${time}\t`);
      }
    }
    this.timetableJson.push(jedanSat);*/
  }

  displayLineOnMap(lineId: any) {
    this._lineService.getLine(lineId).subscribe(
    (data) => {
      console.log(data);
      this._parent.DrawLineOnMap(data);
    }, 
    (error) => {
      console.log(error);
    })
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
