import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timetable } from 'src/models/timetable';
import { HomeComponent } from '../home/home.component';
import { TimetableService } from '../services/timetable.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  // picked_day: string;
  // picked_type: string;
  // timetables = new Array<Timetable>();
  // timetabletModel = new Array<Timetable>();
  // timetableJson = Array<string>();
  // selectedLineName: string = "";
  // myForm: FormGroup;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'Direction'];

  selectedRowIndex: number = -1;
  selectedRowElements: Array<any> = new Array<any>();
  timetables: Array<Timetable>;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
     private _sevice: TimetableService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._parent.prikaziLeviMeni();
    this.getAllTimetables();
  }

  getAllTimetables(){
    this._sevice.getAllTimetables()
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

  selectLine(row: any, $event: any){
    this.selectedRowIndex = row.Index;
    if(row.Selected)
    {
      row.Selected = false;
      this.removeLineFromMap(row.Id);
      var index = this.selectedRowElements.findIndex(x => x.LineId == row.Id);
      this.selectedRowElements.splice(index,1)
    }else
    {
      row.Selected = true;
      this.displayLineOnMap(row.Id);
      this.selectedRowElements.push(this.timetables.find(x => x.LineId == row.Id));
    }
  }

  displayLineOnMap(lineId: any) {
    this._parent.DisplayLineOnMap(lineId);
  }

  removeLineFromMap(lineId: any){
    this._parent.RemoveLineFromMap(lineId);
  }

  createDataSource(data: any): any{
    var retVal = new Array();
    var index = -1;
    for(let item of data){
      retVal.push({
        Selected: false,
        Index : ++index,
        Id : item.LineId,
        Direction : item.Line.Direction,
        LineNumber : (Number)(item.LineId.replace('A','').replace('B','').replace('A','').replace('B',''))
      })
    }
    return retVal.sort((x,y) => x.LineNumber - y.LineNumber);
  }

  applyFilter(filterValue: string) {
    if(filterValue.toLowerCase().trim().includes('prika'))
      this.dataSource.filter = "true";
    else
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTimesJson(timetable: Timetable, pickedDay: string): any{
    let timesJson = JSON.parse(timetable.Times);
    let selectedDayTimesJson = new Array<string>();
    if(pickedDay == "Radni_dan")
      selectedDayTimesJson = timesJson['Radni_dan'];
    else if(pickedDay == "Subota")
      selectedDayTimesJson = timesJson['Subota'];
    else if(pickedDay == "Nedelja")
      selectedDayTimesJson = timesJson['Nedelja'];

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
    
    for (let sat = 4; sat < 24; sat++) {
      let satStr = sat.toString().padStart(2, '0');
      if (satStr in polasciPoSatima) {
        let prikazJednogSata = satStr+"|" + polasciPoSatima[satStr].join(",");
        timetableJson.push(prikazJednogSata);
      }
    }

    return timetableJson;
  }
  

  //   this.myForm = this._formBuilder.group({
  //     day: ['', Validators.required],
  //     type: ['', Validators.required],
  //     line: ['', Validators.required]
  //   });

  //   this._sevice.getAllTimetables()
  //     .subscribe(
  //       data => {
  //         this.timetables = data;
  //         this.timetables.forEach(x=> x.Line.DisplayName = `${x.Line.Id} ${x.Line.Direction}`)
  //         this.timetabletModel = this.getGradski();
  //         //this.btnDayClick('radni');
  //         //this.btnTypeClick('gradski');
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )
  // }

  // get f() { return this.myForm.controls; }
  
  // save() {
  //   this.f.day.setValue(this.picked_day);
  //   this.f.type.setValue(this.picked_type);

  //   if (this.myForm.invalid) {
  //     this.timetableJson = new Array<string>();
  //     return;
  //   }

  //   let selectedLineCode = this.f.line.value;
  //   let selectedTimeTableObject = this.timetables.find(x => x.Line.Id == selectedLineCode);
  //   this.selectedLineName = selectedTimeTableObject.Line.DisplayName;

  //   this.displayLineOnMap(selectedTimeTableObject.Line.Id);

  //   let timesJson = JSON.parse(selectedTimeTableObject.Times);
  //   let selectedDayTimesJson = new Array<string>();
  //   if(this.picked_day == "Radni_dan")
  //     selectedDayTimesJson = timesJson['Radni_dan'];
  //   else if(this.picked_day == "Subota")
  //     selectedDayTimesJson = timesJson['Subota'];
  //   else if(this.picked_day == "Nedelja")
  //     selectedDayTimesJson = timesJson['Nedelja'];

  //   this.timetableJson = new Array<string>();

  //   let polasciPoSatima = {};
  //   selectedDayTimesJson.forEach(
  //     (item, indeks) => {
  //       let satMinut = item.split(":");
  //       if (!(satMinut[0] in polasciPoSatima)) {
  //         polasciPoSatima[satMinut[0]] = new Array<string>();
  //       }

  //       polasciPoSatima[satMinut[0]].push(satMinut[1]);
  //     });
    
  //   for (let sat = 4; sat < 24; sat++) {
  //     let satStr = sat.toString().padStart(2, '0');
  //     if (satStr in polasciPoSatima) {
  //       let prikazJednogSata = satStr+"|" + polasciPoSatima[satStr].join(",");
  //       this.timetableJson.push(prikazJednogSata);
  //     }
  //   }
  // }

  // displayLineOnMap(lineId: any) {
  //   this._parent.DisplayLineOnMap(lineId);
  // }
  
  // getPrigradski(): Array<Timetable>{
  //   return this.timetables
  //   .filter(
  //     x => (Number)(x.Line.Id.replace('A','').replace('B','')) > 20
  //   ).filter(
  //     x => x.Times.includes(this.picked_day)
  //   ).sort(
  //     (x,y) => (Number)(x.Line.Id.replace('A','').replace('B','')) - (Number)(y.Line.Id.replace('A','').replace('B',''))
  //   );
  // }

  // getGradski(): Array<Timetable>{
  //   return this.timetables
  //   .filter(
  //     x => (Number)(x.Line.Id.replace('A','').replace('B','')) < 20
  //   ).filter(
  //     x => x.Times.includes(this.picked_day)
  //   )
  //   .sort(
  //     (x,y) => (Number)(x.Line.Id.replace('A','').replace('B','')) - (Number)(y.Line.Id.replace('A','').replace('B',''))
  //   );
  // }

  // public btnDayClick(day: string){
  //   let radni = document.getElementById('radni');

  //   radni.className = 'square_btn';
  //   let sub = document.getElementById('subota');
  //   sub.className = 'square_btn';
  //   let ned = document.getElementById('nedelja');
  //   ned.className = 'square_btn';
    
  //   if(day == 'radni'){
  //     radni.className = 'square_btn_active';
  //     this.picked_day = 'Radni_dan';
  //     this.myForm.reset();
  //   }
  //   else if(day == 'subota'){
  //     sub.className = 'square_btn_active';
  //     this.picked_day = 'Subota';   
  //     this.myForm.reset();  
  //   }
  //   else if(day == 'nedelja'){
  //     ned.className = 'square_btn_active'; 
  //     this.picked_day = 'Nedelja';
  //     this.myForm.reset();
  //   }
  // }

  // public btnTypeClick(type: string){
  //   let gradski = document.getElementById('gradski');
  //   gradski.className = 'square_btn';
  //   let prigradski = document.getElementById('prigradski');
  //   prigradski.className = 'square_btn';
    
  //   if(type == 'gradski'){
  //     gradski.className = 'square_btn_active';
  //     this.picked_type = 'gradski';
  //     this.timetabletModel = this.getGradski();
  //     this.myForm.reset();
  //   }
  //   else if(type == 'prigradski'){
  //     prigradski.className = 'square_btn_active';
  //     this.picked_type = 'prigradski';
  //     this.timetabletModel = this.getPrigradski();
  //     this.myForm.reset();
  //   }
  // }
}
