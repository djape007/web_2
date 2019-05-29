import { Component } from '@angular/core';
import { MainService } from './services/main.service';
import { Bus } from 'src/models/bus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //constructor(private _service: MainService) { }

  // public funkcija(){
  //   this._service.getAllBuses()
  //     .subscribe(data => {
  //       var buses = new Array<Bus>();
  //       buses = data;
  //       console.log(buses);
  //     })
  // }

}
