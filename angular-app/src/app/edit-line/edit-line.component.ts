import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.css']
})
export class EditLineComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent, private _lineService: LineService) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();
  }
}
