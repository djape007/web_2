import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-edit-bus-stop',
  templateUrl: './edit-bus-stop.component.html',
  styleUrls: ['./edit-bus-stop.component.css']
})
export class EditBusStopComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();
  }

}
