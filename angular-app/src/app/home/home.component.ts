import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {} from 'googlemaps';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  @ViewChild('map') mapElement: any;
  @ViewChild('leftPanel') leftPanelComponent: any;
  @ViewChild('rightPanel') rightPanelComponent: any;
  map: google.maps.Map;

  public displayedPanel: string = 'none';

  constructor(private _router: Router) { }

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        if(event.url == '/home')
          this.prikaziMapu();
      }
    });

    const mapProperties = {
         center: new google.maps.LatLng(45.248636, 19.833549),
         zoom: 14,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         disableDefaultUI: true,
         mapTypeControlOptions: {
          mapTypeIds: ['styled_map']
        }
    };

    var styledMap = new google.maps.StyledMapType([ { "elementType": "geometry", "stylers": [ { "color": "#ebe3cd" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#523735" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#c9b2a6" } ] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [ { "color": "#dcd2be" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#ae9e90" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#93817c" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#a5b076" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#447530" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#f5f1e6" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#fdfcf8" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#f8c967" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#e9bc62" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#e98d58" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [ { "color": "#db8555" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#806b63" } ] }, { "featureType": "transit.line", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [ { "color": "#8f7d77" } ] }, { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [ { "color": "#ebe3cd" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#dfd2ae" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#b9d3c2" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#92998d" } ] } ],
     {name: "styled_map"});

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.map.mapTypes.set('styled_map', styledMap);
        this.map.setMapTypeId('styled_map');
 }

 public removeOverlay(){
  let el = document.getElementsByClassName('map-overlay')[0];
  if (el != null) {
    el.className = "map-no-overlay";
    this.mapElement.nativeElement.className = "";
  }
 }

 public displayOverlay() {
  let el = document.getElementsByClassName('map-no-overlay')[0];
  if (el != null) {
    el.className = "map-overlay";
    this.mapElement.nativeElement.className = "blurGrayscale";
  }
 }

 public prikaziLeviMeni() {
  this.hideRightPanel();
  this.displayLeftPanel();

  this.moveMapRight();
  this.displayOverlay();
 }

 public prikaziDesniMeni() {
  this.hideLeftPanel();
  this.displayRightPanel();
  
  this.moveMapLeft();
  this.displayOverlay();
 }

 public prikaziMapu() {
  this.hideLeftPanel();
  this.hideRightPanel();
  this.centerMap();
  this.removeOverlay();
 }

 private NavigateToMap() {
  this._router.navigate(['/home']);
 }

  private displayLeftPanel() {
    let levi = document.getElementById('leftPanel');
    levi.style.webkitTransform = "translate3d(0,0,0)";
    levi.style.zIndex = "100";
  }

  private hideLeftPanel() {
    let levi = document.getElementById('leftPanel');
    levi.style.webkitTransform = "translate3d(-400px,0,0)";
    levi.style.zIndex = "-500";
  }

  private displayRightPanel() {
    let desni = document.getElementById('rightPanel');
    desni.style.zIndex = "100";
    desni.style.webkitTransform = "translate3d(0,0,0)";
  }

  private hideRightPanel() {
    let desni = document.getElementById('rightPanel');
    desni.style.webkitTransform = "translate3d(400px,0,0)";
    desni.style.zIndex = "-500";
  }

  private moveMapRight() {
    let mapHolder = document.getElementById('map-holder');
    mapHolder.style.webkitTransform = "translate3d(400px,0,0)";
  }

  private moveMapLeft() {
    let mapHolder = document.getElementById('map-holder');
    mapHolder.style.webkitTransform = "translate3d(-400px,0,0)";
  }

  private centerMap() {
    let mapHolder = document.getElementById('map-holder');
    mapHolder.style.webkitTransform = "translate3d(0,0,0)";
  }
}
