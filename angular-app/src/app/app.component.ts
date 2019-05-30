import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MainService } from './services/main.service';
import { Bus } from 'src/models/bus';
import {} from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor(private _service: MainService) { }

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(45.248636, 19.833549),
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
 }

  public funkcija(){
    this._service.getAllBuses()
      .subscribe(
        data => {
          var buses = new Array<Bus>();
          buses = data;
          console.log(buses);
        },
        err => {
          console.log(err);
        }
      )
  }
}
