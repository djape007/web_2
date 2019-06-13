import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LineService } from '../services/line.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Line } from 'src/models/line';
import { MatTableDataSource } from '@angular/material';
import { PointPathLine } from 'src/models/point-path-line';
import { Guid } from 'guid-typescript';
import { PointService } from '../services/point.service';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {
  getLineForm: FormGroup;
  lineForm: FormGroup;
  pointForm: FormGroup;

  line: Line;
  newLine: Line;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['SequenceNumber', 'X', 'Y'];

  selectedRowIndex: Number;

  eTag: string = '';

  message: string = '';

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent, private _lineService: LineService,
  private formBuilder: FormBuilder, private _pointService: PointService) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();

    this.getLineForm = this.formBuilder.group({
      lineId: ['', Validators.required]
    });

    this.lineForm = this.formBuilder.group({
      lineId: ['', Validators.required],
      direction: ['', Validators.required]
    });

    this.pointForm = this.formBuilder.group({
      x: ['', Validators.required],
      y: ['', Validators.required],
      seq: ['', Validators.required]
    });
  }

  get getLinef() { return this.getLineForm.controls; }
  get linef() { return this.lineForm.controls; }
  get pointf() { return this.pointForm.controls; }

  addNewLineBtnClick(){
    this.selectedRowIndex = null;
    this.line = null;
    this.newLine = new Line();
    this.newLine.Id = '';
    this.newLine.Direction = '';
    this.newLine.PointLinePaths = new Array<PointPathLine>();
    this.dataSource = new MatTableDataSource(this.createDataSource(this.newLine.PointLinePaths));

    this.linef.lineId.setValue(this.newLine.Id);
    this.linef.direction.setValue(this.newLine.Direction);

    this.message = '';
  }

  editLineBtnClick(){
    if(this.getLineForm.invalid)
      return;

    this.message = '';

    this.newLine = null;

    var lineId = this.getLinef.lineId.value;
    this._lineService.getLine(lineId)
      .subscribe(
        data => {
          this.eTag = data.headers.get('etag');
          this.line = data.body;
          this.dataSource = new MatTableDataSource(this.createDataSource(this.line.PointLinePaths));
          this.linef.lineId.setValue(this.line.Id);
          this.linef.direction.setValue(this.line.Direction);
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
        Id : item.Id,
        X : item.X,
        Y : item.Y,
        SequenceNumber : item.SequenceNumber
      };
      retVal.push(pushVal);      
    }
    return retVal.sort((x,y) => x.SequenceNumber - y.SequenceNumber);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editLine(){
    if(this.lineForm.invalid)
      return;

    this.line.Id = this.linef.lineId.value;
    this.line.Direction = this.linef.direction.value;

    this._lineService.editLine(this.line, this.eTag)
      .subscribe(
        data => {
          this.line = null;
        },
        err => {
          console.log(err);
          if(err.status == 412)
          {
            this.message = "Neko je vec izvrsio izmene. Osvezite resurs."
          }
        }
      )
  } 

  addLine(){
    if(this.lineForm.invalid)
      return;

    this.newLine.Id = this.linef.lineId.value;
    this.newLine.Direction = this.linef.direction.value;

    this.newLine.PointLinePaths.forEach(element => {
      element.LineId = this.newLine.Id;
    });
    this._lineService.addLine(this.newLine)
      .subscribe(
        data => {
          this.newLine.PointLinePaths.forEach(element => {
            this._pointService.addPoint(element)
              .subscribe(
                data => {
                },
                err => {
                }
              )
          });
          this.newLine = null;
        },
        err => {
          console.log(err);
        }
      )
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

  addPoint(){
    if(this.pointForm.invalid)
      return;

    var point = new PointPathLine();
    point.Id = Guid.create();
    point.X = this.pointf.x.value;
    point.Y = this.pointf.y.value;
    point.SequenceNumber = this.pointf.seq.value;
    if(point.SequenceNumber <= 0)
      point.SequenceNumber = 1;

    if(this.line){
      if(this.lineForm.invalid)
        return;

      point.LineId = this.line.Id;
      this._lineService.editLine(this.line,this.eTag)
        .subscribe(
          data => {
            this._pointService.addPoint(point)
            .subscribe(
              data => {
                this._lineService.getLine(this.line.Id)
                  .subscribe(data => {
                    this.eTag = data.headers.get('etag');
                    this.line = data.body;
                    this.dataSource = new MatTableDataSource(this.createDataSource(this.line.PointLinePaths));
                  },
                  err => {
                    console.log(err);
                  }
                )
              },
              err => {
                console.log(err);
              }
            )
          },
          err => {
            console.log(err);
            if(err.status == 412)
            {
              this.message = "Neko je vec izvrsio izmene. Osvezite resurs."
            }
          }
        )
    }else if(this.newLine){
      if (this.newLine.PointLinePaths.find(x => x.SequenceNumber == point.SequenceNumber)){
        this.newLine.PointLinePaths.filter(x => x.SequenceNumber >= point.SequenceNumber).forEach(x => ++x.SequenceNumber);
        this.newLine.PointLinePaths.push(point);
      }
      else{
        var maxSeqNum = 1;
        if(this.newLine.PointLinePaths.length > 0){
          var sorted =  this.newLine.PointLinePaths.sort((x,y) => x.SequenceNumber - y.SequenceNumber);
          maxSeqNum = sorted[sorted.length-1].SequenceNumber;
          maxSeqNum++;
        }

        if(point.SequenceNumber > maxSeqNum)
          point.SequenceNumber = maxSeqNum;

        this.newLine.PointLinePaths.push(point);
      }
      this.dataSource = new MatTableDataSource(this.createDataSource(this.newLine.PointLinePaths));
    }
  }

  deletePoint(){
    if(this.line){
      if(this.lineForm.invalid)
        return;

      var point = this.line.PointLinePaths.find(x => x.SequenceNumber == this.selectedRowIndex);
      this._lineService.editLine(this.line, this.eTag)
        .subscribe(
          data => {
            this._pointService.deletePoint(point)
              .subscribe(
                data => {
                  this._lineService.getLine(this.line.Id)
                    .subscribe(data => {
                      this.eTag = data.headers.get('etag');
                      this.line = data.body;
                      this.dataSource = new MatTableDataSource(this.createDataSource(this.line.PointLinePaths));
                    },
                    err => {
                      console.log(err);
                    }
                  )
                },
                err => {
                  console.log(err);
                }
              )
          },
          err => {
            if(err.status == 412)
            {
              this.message = "Neko je vec izvrsio izmene. Osvezite resurs."
            }
          }
        )
    }else if(this.newLine){
      var point = this.newLine.PointLinePaths.find(x => x.SequenceNumber == this.selectedRowIndex);
      if(point==null)
        return;

      this.newLine.PointLinePaths.filter(x => x.SequenceNumber > point.SequenceNumber).forEach(x => --x.SequenceNumber);
      var index = this.newLine.PointLinePaths.findIndex(x => x.Id == point.Id);
      this.newLine.PointLinePaths.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.createDataSource(this.newLine.PointLinePaths));
      this.selectedRowIndex = null;
    }
  }

  selectRow(row: any){
    this.selectedRowIndex = row.SequenceNumber;
  }

  deleteLine(){
    if(this.getLineForm.invalid)
      return;

    this.message = '';

    var lineId = this.getLinef.lineId.value;

    this._lineService.deleteLine(lineId)
      .subscribe(
        data => {
          this.line = null;
          this.selectedRowIndex = null;
        },
        err => {
          console.log(err);
        }
      )
  }

}
