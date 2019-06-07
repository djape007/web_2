import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-bought-tickets',
  templateUrl: './bought-tickets.component.html',
  styleUrls: ['./bought-tickets.component.css']
})
export class BoughtTicketsComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();
  }

}
