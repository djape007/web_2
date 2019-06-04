import { Component, OnInit, Inject, forwardRef, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { PriceHistory } from 'src/models/price-history';
import { Coefficient } from 'src/models/coefficient';
import { PricelistElement } from 'src/models/pricelist-element';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Guid } from 'guid-typescript';

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
    private formBuilder: FormBuilder, private _service: TicketService) { }

  ngOnInit() {
    this._parent.prikaziLeviMeni();

    this._service.getAllPriceHistories()
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createPricelist() : PricelistElement[]{
    var index = -1;
    var retVal = new Array<PricelistElement>();
    for(let priceHistory of this.priceHistories){
      for(let coef of this.coefficients){
        var pricelistEl = new PricelistElement();
        pricelistEl.pricelist = priceHistory.ProductType.Name;
        pricelistEl.person = coef.Type;
        pricelistEl.price = priceHistory.Price*coef.Value;
        pricelistEl.id = ++index;
        pricelistEl.productTypeId = priceHistory.ProductType.Id;
        retVal.push(pricelistEl);
      }
    }
    return retVal;
  }

  highlight(row: any){
    this.selectedRowIndex = row.id;
    this.selectedRowElement = row;
  }

  buyTicket(row: any){
    this.message = '';
    if(row==undefined){
      this.message = 'Izaberite kartu';
      return;
    }

    this._service.buyTicket(row.productTypeId)
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
