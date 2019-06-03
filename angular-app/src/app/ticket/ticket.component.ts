import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { MainService } from '../services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,private formBuilder: FormBuilder, private _service: MainService, private router: Router) { }

  ngOnInit() {
    this._parent.prikaziLeviMeni();
  }

}
