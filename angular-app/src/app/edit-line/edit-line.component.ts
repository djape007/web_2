import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TimetableService } from '../services/timetable.service';
import { MatTableDataSource } from '@angular/material';
import { Timetable } from '../../models/timetable';
import { LineService } from '../services/line.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'Direction'];

  selectedRowIndex: string;
  timetables: Array<Timetable>;
  selectedDay: string;

  timetableJson: Array<string>;
  timeForm: FormGroup;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
     private _timetablesevice: TimetableService, private _lineService: LineService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();
    this.getAllTimetables();
    this.timeForm = this.formBuilder.group({
      hour: ['', Validators.compose([Validators.required, Validators.max(23), Validators.min(0),, Validators.minLength(2), Validators.maxLength(2)])],
      minute: ['', Validators.compose([Validators.required, Validators.max(59), Validators.min(0), Validators.minLength(2), Validators.maxLength(2)])]
    });
  }

  getAllTimetables(){
    this._timetablesevice.getAllTimetables()
    .subscribe(
      data => {
        this.timetables = data;
        this.dataSource = new MatTableDataSource(this.createDataSource(data));
      },
      err => {
        console.log(err);
      }
    )
  }

  createDataSource(data: any): any{
    var retVal = new Array();
    for(let item of data){
      var pushVal = {
        Id : item.LineId,
        Direction : item.Line.Direction,
        LineNumber : (Number)(item.LineId.replace('A','').replace('B','').replace('A','').replace('B',''))
      };

      retVal.push(pushVal);      
    }
    return retVal.sort((x,y) => x.LineNumber - y.LineNumber);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectLine(row: any){
    this.selectedRowIndex = row.Id;
    this.timetableJson = null;
    this.selectedDay = null;
  }

  getTimesJson(lineId: string, pickedDay: string){
    var timetable = this.timetables.find(x => x.LineId.toString() == lineId);
    if(timetable == null)
      return;

    let timesJson = JSON.parse(timetable.Times);
    let selectedDayTimesJson = new Array<string>();
    if(pickedDay == "Radni dan"){
      selectedDayTimesJson = timesJson['Radni_dan'];
      this.selectedDay = "Radni_dan";
    }
    else if(pickedDay == "Subota"){
      selectedDayTimesJson = timesJson['Subota'];
      this.selectedDay = "Subota";
    }
    else if(pickedDay == "Nedelja"){
      selectedDayTimesJson = timesJson['Nedelja'];
      this.selectedDay = "Nedelja";
    }

    var timetableJson = new Array<string>();

    let polasciPoSatima = {};
    selectedDayTimesJson.forEach(
      (item, indeks) => {
        let satMinut = item.split(":");
        if (!(satMinut[0] in polasciPoSatima)) {
          polasciPoSatima[satMinut[0]] = new Array<string>();
        }

        polasciPoSatima[satMinut[0]].push(satMinut[1]);
      });
    
    for (let sat = 4; sat < 24+4; sat++) {
      let satStr = (sat % 24).toString().padStart(2, '0');
      if (satStr in polasciPoSatima) {
        let prikazJednogSata = satStr+"|" + polasciPoSatima[satStr].join(",");
        timetableJson.push(prikazJednogSata);
      }
    }
    this.timetableJson = timetableJson;
  }

  get f() { return this.timeForm.controls; }

  addTime(){
    if (this.timeForm.invalid) {
      return;
    }

    //provera da li hoce da doda vec postojeci H:M
    // this.timetableJson.forEach(element => {
    //   var splitVal = element.split('|')[0];
    //   if(splitVal[0] == this.f.hour.value){
    //     var minutes = splitVal[1].split(',');
    //     minutes.forEach(element => {
    //       if(element == this.f.minute.value)
    //         return;
    //     });
    //   }
    // });

    var time = `${this.f.hour.value}:${this.f.minute.value}`;
    var lastTime = `${time},`;

  }

  removeTime(){
    if (this.timeForm.invalid) {
      return;
    }
    console.log('remove');
  }
}
