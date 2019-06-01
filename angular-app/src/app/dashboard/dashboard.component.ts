import { Component, ViewChild, OnInit } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{

  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor() { }

  ngOnInit(): void {
    const mapProperties = {
         center: new google.maps.LatLng(45.248636, 19.833549),
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
 }

 public removeOverlay(){
  let el = document.getElementsByClassName('map-overlay')[0];
  el.className = "map-no-overlay";
 }
}
