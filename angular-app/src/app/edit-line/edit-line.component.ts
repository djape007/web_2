import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LineService } from '../services/line.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Line } from 'src/models/line';
import { forEach } from '@angular/router/src/utils/collection';
import { BusStop } from 'src/models/bus-stop';
import { MatTableDataSource } from '@angular/material';
import { PointPathLine } from 'src/models/point-path-line';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {

  lineForm: FormGroup;
  line: Line;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['SequenceNumber', 'X', 'Y'];

  selectedRowIndex: Number;
  newPoint: PointPathLine;

  pointForm: FormGroup;

  newLine: boolean = false;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent, private _lineService: LineService,
  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();

    this.lineForm = this.formBuilder.group({
      lineId: ['', Validators.required]
    });

    this.pointForm = this.formBuilder.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      seq: ['', Validators.required]
    });
  }

  get f() { return this.lineForm.controls; }
  get pointf() { return this.pointForm.controls; }

  editBtnClick(){
    if(this.lineForm.invalid)
      return;

    this.newLine = false;
    var lineId = this.f.lineId.value;
    this._lineService.getLine(lineId)
      .subscribe(
        data => {
          this.line = data;
          this.dataSource = new MatTableDataSource(this.createDataSource(this.line.PointLinePaths));
        },
        err => {
          console.log(err);
        }
      )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createDataSource(data: any): any{
    var retVal = new Array();
    for(let item of data){
      var pushVal = {
        Id : item.Id,
        X : item.X,
        Y : item.Y,
        SequenceNumber : item.SequenceNumber
      };

      retVal.push(pushVal);      
    }
    return retVal.sort((x,y) => x.SequenceNumber - y.SequenceNumber);
  }

  selectRow(row: any){
    this.selectedRowIndex = row.SequenceNumber;
    this.newPoint = null;
    this.newLine = false;
    // var point = this.line.PointLinePaths.find(x => x.Id == row.Id);
    // if(point==null)
    //   return;

    // var latLngArr = new Array<google.maps.LatLng>();
    // latLngArr.push(new google.maps.LatLng(point.X,point.Y));
    // latLngArr.push(new google.maps.LatLng(point.X,point.Y));
    // this._parent.drawPoint(latLngArr);
  }

  addNewBtnClick(){
    this.newPoint = new PointPathLine();
    this.newPoint.Id = Guid.create();
    this.newPoint.LineId = this.line.Id;
    this.selectedRowIndex = null;
  }

  xIsNotNumber(){
    var val = this.pointf.x.value;
    if(isNaN(val))
      this.pointf.x.setErrors({'notnumber': true});
  }

  yIsNotNumber(){
    var val = this.pointf.y.value;
    if(isNaN(val))
      this.pointf.y.setErrors({'notnumber': true});
  }

  seqIsNotNumber(){
    var val = this.pointf.seq.value;
    if(isNaN(val))
      this.pointf.y.setErrors({'notnumber': true});
  }

  editLine(){
    if(this.pointForm.invalid)
      return;

    //pozvati api za kreiranje novog pointa
   }

  deletePoint(){
    var point = this.line.PointLinePaths.find(x => x.SequenceNumber == this.selectedRowIndex);
    if(point==null)
       return;

    //pozvati api za brisanje pointa
  }

  addNewLineBtnClick(){
    this.line = new Line();
    this.line.Id = this.f.lineId.value;
    this.line.PointLinePaths = new Array<PointPathLine>();
    this.newLine = true;
  }

  addLine(){
    if(this.lineForm.invalid || this.pointForm.invalid)
      return;

    //pozvati api za kreiranje linije
  }
}
