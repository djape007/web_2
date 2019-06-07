import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-check-ticket',
  templateUrl: './check-ticket.component.html',
  styleUrls: ['./check-ticket.component.css']
})
export class CheckTicketComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent) { }

  ngOnInit() {
    this._parent.prikaziDesniMeni();
  }

}
