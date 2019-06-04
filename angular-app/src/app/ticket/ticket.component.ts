import { Component, OnInit, Inject, forwardRef, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { PriceHistory } from 'src/models/price-history';
import { Coefficient } from 'src/models/coefficient';
import { PricelistElement } from 'src/models/pricelist-element';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Guid } from 'guid-typescript';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  priceHistories: Array<PriceHistory> = new Array<PriceHistory>();
  coefficients: Array<Coefficient> = new Array<Coefficient>();
  selectedRowIndex: number;
  selectedRowElement: PricelistElement;
  message: string = "";

  displayedColumns: string[] = ['pricelist', 'person','price'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent,
    private formBuilder: FormBuilder, private _service: TicketService, private _auth: AuthService) { }

  ngOnInit() {
    this._parent.prikaziLeviMeni();

    this._service.getCurrentPriceHistories()
      .subscribe(
        data => {
          this.priceHistories = data;
          this._service.getAllCoefficients()
            .subscribe(
              data => {
                this.coefficients = data;
                this.dataSource = new MatTableDataSource(this.createPricelist());
                this.dataSource.sort = this.sort;
              },
              err => {
                console.log(err);
              }
            );
        },
        err => {
          console.log(err);
        }
      );

    this._service.getAllCoefficients()
      .subscribe(
        data => {
          this.coefficients = data;
          this.dataSource.sort = this.sort;
          this.dataSource = new MatTableDataSource(this.createPricelist());
        },
        err => {
          console.log(err);
        }
      );

  }

  UserCanBuy(row: PricelistElement) {
    if(this._auth.getToken() === null){
      if (row.person == "obican" && row.productTypeName == "Vremenska (1h)") {
        return true;
      } else {
        row.purchasable = false;
        return false;
      }
    } else {
      return true;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createPricelist() : PricelistElement[]{
    var index = -1;
    var retVal = new Array<PricelistElement>();
    for(let priceHistory of this.priceHistories){
      for(let coef of this.coefficients){
        var pricelistEl = new PricelistElement();
        pricelistEl.productTypeName = priceHistory.ProductType.Name;
        pricelistEl.person = coef.Type;
        pricelistEl.price = priceHistory.Price*coef.Value;
        pricelistEl.id = ++index;
        pricelistEl.productTypeId = priceHistory.ProductType.Id;
        pricelistEl.purchasable = true;
        retVal.push(pricelistEl);
      }
    }
    return retVal;
  }

  selectTicket(row: PricelistElement){
    if (row.purchasable) {
      this.selectedRowIndex = row.id;
      this.selectedRowElement = row;
    }
  }

  buyTicket(row: PricelistElement){
    this.message = '';
    if(row==undefined){
      this.message = 'Izaberite kartu';
      return;
    }

    if(this._auth.getToken === undefined){
      this._service.buyTicket(row.productTypeId)
        .subscribe(
          data => {
            var a = data;
          },
          err => {
            this.message = err.error.Message;
          }
        )
    }else{
      this._service.buyTicketAnonymous()
        .subscribe(
          data => {
            var a = data;
          },
          err => {
            this.message = err.error.Message;
          }
        )
    }

  }
}
