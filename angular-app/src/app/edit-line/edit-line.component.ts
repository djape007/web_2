import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LineService } from '../services/line.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Line } from 'src/models/line';
import { forEach } from '@angular/router/src/utils/collection';
import { BusStop } from 'src/models/bus-stop';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {

  lineForm: FormGroup;
  line: Line;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent, private _lineService: LineService,
  private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();

    this.lineForm = this.formBuilder.group({
      lineId: ['', Validators.required]
    });
  }

  get f() { return this.lineForm.controls; }

  editBtnClick(){
    if(this.lineForm.invalid)
      return;

    var lineId = this.f.lineId.value;
    this._lineService.getLine(lineId)
      .subscribe(
        data => {
          this.line = data;
          // var linesDict = {};
          // this.line.BusStopsOnLines.forEach(element => {
          //   if(!linesDict[element.BusStop.Name]){
          //     linesDict[element.BusStop.Name] = new Array<BusStop>();
          //     linesDict[element.BusStop.Name].push(element.BusStop);
          //   }
          //   else{
          //     linesDict[element.BusStop.Name].push(element.BusStop);
          //   }
          // });
          // console.log(linesDict);
        },
        err => {
          console.log(err);
        }
      )
  }
}
