import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {} from 'googlemaps';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  @ViewChild('map') mapElement: any;
  @ViewChild('leftPanel') leftPanelComponent: any;
  @ViewChild('rightPanel') rightPanelComponent: any;
  map: google.maps.Map;

  public displayedPanel: string = 'none';

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        var r = event.url.split('//')[0];
        if(r.includes('leftRouter'))
          this.prikaziLeviMeni();
        else if(r.includes('rightRouter'))
          this.prikaziDesniMeni();
        else if(r.includes('home'))
          this.prikaziMapu();
      }
    });
    //this.prikaziMapu();

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

 public displayOverlay() {
  let el = document.getElementsByClassName('map-no-overlay')[0];
  el.className = "map-overlay";
 }

 public prikaziLeviMeni() {
  let levi = document.getElementById('leftPanel');
  let desni = document.getElementById('rightPanel');
  levi.style.webkitTransform = "translate3d(0,0,0)";
  levi.style.zIndex = "30000";
  desni.style.webkitTransform = "translate3d(400px,0,0)";
  desni.style.zIndex = "1";

  let mapHolder = document.getElementById('map-holder');
  mapHolder.style.webkitTransform = "translate3d(400px,0,0)";
  //this.displayOverlay();
 }

 public prikaziDesniMeni() {
  let levi = document.getElementById('leftPanel');
  let desni = document.getElementById('rightPanel');
  levi.style.webkitTransform = "translate3d(-400px,0,0)";
  levi.style.zIndex = "1";
  desni.style.zIndex = "30000";
  desni.style.webkitTransform = "translate3d(0,0,0)";
  
  let mapHolder = document.getElementById('map-holder');
  mapHolder.style.webkitTransform = "translate3d(-400px,0,0)";
  //this.displayOverlay();
 }

 public prikaziMapu() {
  let levi = document.getElementById('leftPanel');
  let desni = document.getElementById('rightPanel');
  levi.style.webkitTransform = "translate3d(-400px,0,0)";
  levi.style.zIndex = "1";
  desni.style.zIndex = "1";
  desni.style.webkitTransform = "translate3d(400px,0,0)";
  
  let mapHolder = document.getElementById('map-holder');
  mapHolder.style.webkitTransform = "translate3d(0,0,0)";
  //this.removeOverlay();
 }
}
