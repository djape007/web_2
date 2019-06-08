import { Component, ViewChild, OnInit, Input } from '@angular/core';
import {} from 'googlemaps';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RoutesRecognized } from '@angular/router';
import { Line } from 'src/models/line';
import { BusStop } from 'src/models/bus-stop';
import { AuthService } from '../services/auth.service';
import { LineService } from '../services/line.service';
import { Bus } from 'src/models/bus';
import { BusService } from '../services/bus.service';

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
  putanjePrikazanihLinija: Array<any> = new Array<any>();
  stanicePrikazaneNaMapi: Array<any> = new Array<any>();
  prikazaneLinije: Array<any> = new Array<any>(); //lineId => Line objekat
  prikazaniAutobusi: Array<any> = new Array<any>();

  public displayedPanel: string = 'none';

  constructor(private _router: Router, private _auth: AuthService,private _lineService: LineService,
    private _busService: BusService) { }

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

 public checkIfLoggedIn(): Boolean{
    if(this._auth.getToken())
      return true;
    else
      return false;
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

  public DisplayLineOnMap(lineId: string) {
    this._lineService.getLine(lineId).subscribe(
      (data) => {
        console.log(data);
        this.DrawLineOnMap(data);
      }, 
      (error) => {
        console.log(error);
      })
  }

  public DrawLineOnMap(linija: Line) {
    if (linija.Id in this.putanjePrikazanihLinija) {
      console.log("Linija je vec nacrtana");
      return;
    }

    //samo da nacrta autobuse kad se linija prikaze
    this.UpdateBusPositions();

		let SelectedLineCoordinates = new Array<google.maps.LatLng>();
    
    if (linija.PointLinePaths.length == 0) {
      console.log(linija.Id + " nema putanju");
      return;
    }

    let sortiranaPutanja = linija.PointLinePaths.sort((a,b) => a.SequenceNumber - b.SequenceNumber);
    
		sortiranaPutanja.forEach((item) => {
      SelectedLineCoordinates.push(new google.maps.LatLng(item.X,item.Y));	
		});
    
    let bojaLinije = "#"+linija.Id+linija.Id;

    if (bojaLinije.length == 5) {
      bojaLinije += "55";
    }

		let polyOptions = {
            path: SelectedLineCoordinates,
            geodesic: true,
						strokeColor: bojaLinije,
						strokeOpacity: 1,
            strokeWeight: 4,
            //editable: true //za admina
    }
		
		this.putanjePrikazanihLinija[linija.Id] = new google.maps.Polyline(polyOptions);
    this.putanjePrikazanihLinija[linija.Id].setMap(this.map);
    this.prikazaneLinije[linija.Id] = linija;

    if (linija.BusStopsOnLines.length > 0) {
      linija.BusStopsOnLines.forEach((BusStopLineConnection, index) => {
          this.DrawBusStopOnMap(BusStopLineConnection.BusStop, linija.Id);
      });
    } else {
      console.log(linija.Id + " nema stanice");
    }

  }

  public RemoveLineFromMap(lineId: string) {
    if (!(lineId in this.prikazaneLinije)) {
      console.log("JAOOO " + lineId + " bolje ovo da ne vidim");
      return;
    }

    let linijaZaBrisanje = this.prikazaneLinije[lineId] as Line;
    this.putanjePrikazanihLinija[lineId].setMap(null);
    
    linijaZaBrisanje.BusStopsOnLines.forEach(element => {
      this.stanicePrikazaneNaMapi[element.BusStopId.toString() + "_" + lineId].setMap(null);
    });

    linijaZaBrisanje.Buses.forEach(element => {
      this.RemoveBusFromMap(element);
    });
    delete this.putanjePrikazanihLinija[lineId];
    delete this.prikazaneLinije[lineId]
  }

  public DrawBusStopOnMap(busStop: BusStop, lineId: string = "") {
    let markerIconPath = "../../assets/imgs/busStopMarker_mini.png";

    let marker = this.DrawMarkerOnMap(busStop.X, busStop.Y, busStop.Name + "|" + busStop.Address, markerIconPath);
    let infoWindow = this.CreateBusStopInfoWindow(busStop, lineId);
    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });

    //kad se prikaze infowindow ovaj kod ce se izvrsiti
    /*google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
      let btnsPrikaziLiniju = document.getElementsByClassName('btnDisplayLineFromInfoWindow');
      
      for(let i = 0; i < btnsPrikaziLiniju.length; i++) {
        btnsPrikaziLiniju[i].addEventListener('click', (event) => {
          event.stopPropagation();
          this.DisplayLineOnMap(btnsPrikaziLiniju[i].getAttribute("lineId").toString());
        });
      }
    });*/
    this.stanicePrikazaneNaMapi[busStop.Id.toString() + "_" + lineId] = marker;
  }

  private CreateBusStopInfoWindow(busStop: BusStop, lineId:string = ""): google.maps.InfoWindow {
    let ostaleLinije = busStop.Address.split(",");
    let prikaziLinijeHTML = "";
    /*ostaleLinije.forEach(idLinije => {
      if (idLinije != lineId) {
        prikaziLinijeHTML += "<button class='btnInfoWindow btnDisplayLineFromInfoWindow' lineId='"+idLinije+"'>Prikazi "+idLinije+"</button>";
      }
    });*/

    let content = `
    <div><b>`+busStop.Name+`</b></div>
    <div>Linije koje staju na ovoj stanici:</div>
    <div>`+busStop.Address+`</div>
    `+prikaziLinijeHTML+`
    `;

    return this.CreateInfoWindow(content);
  }

  private CreateInfoWindow(content: string): google.maps.InfoWindow {
    let infowindow = new google.maps.InfoWindow({
      content: content
    });
    return infowindow;
  }

  private DrawMarkerOnMap(latX: number, lngY: number, title: string, customIcon:string = ""): google.maps.Marker {
    let marker = null;
    if (customIcon.trim().length > 0) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(latX, lngY),
        map: this.map,
        //title: title,
        icon: customIcon,
        //draggable: true //za admina
      });
    } else {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(latX, lngY),
        map: this.map,
        title: title
      });
    }

    marker.setMap(this.map);

    return marker;
  }

  private RemoveMarkerFromMap(marker: google.maps.Marker) {
    marker.setMap(null);
  }

  public UpdateBusPositions() {
    this._busService.getBusesWithLine().subscribe(
      data => {
        data.forEach(element => {
          this.DrawBusOnMap(element);
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  private DrawBusOnMap(bus:Bus) {
    if (bus.LineId in this.prikazaneLinije) {
      if (bus.Id in this.prikazaniAutobusi) {
        this.prikazaniAutobusi[bus.Id].setTitle(bus.Id + "|" + bus.LineId);
        this.prikazaniAutobusi[bus.Id].setZIndex(120);
        this.prikazaniAutobusi[bus.Id].setPosition(
          new google.maps.LatLng(bus.X, bus.Y)
        );
      } else {
        let markerIconPath = "../../assets/imgs/busMarker.png";
        let busMarker = this.DrawMarkerOnMap(bus.X, bus.Y, bus.Id + "|" + bus.LineId, markerIconPath) as google.maps.Marker;
        busMarker.setZIndex(120);
        this.prikazaniAutobusi[bus.Id] = busMarker;
      }
    } else if (bus.Id in this.prikazaniAutobusi) {
      this.RemoveBusFromMap(bus);
    }
  }

  private RemoveBusFromMap(bus:Bus) {
    if (bus.Id in this.prikazaniAutobusi) {
      this.prikazaniAutobusi[bus.Id].setMap(null);
      delete this.prikazaniAutobusi[bus.Id];
    }
  }
}
