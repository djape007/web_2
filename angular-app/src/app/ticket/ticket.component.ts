import { Component, OnInit, Inject, forwardRef, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormBuilder } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { PriceHistory } from 'src/models/price-history';
import { Coefficient } from 'src/models/coefficient';
import { PricelistElement } from 'src/models/pricelist-element';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  priceHistories: Array<PriceHistory> = new Array<PriceHistory>();
  coefficients: Array<Coefficient> = new Array<Coefficient>();

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

  // createPricelist() : Array<Array<string>>{
  //   var retVal = new Array<Array<string>>();
  //   for(let priceHistory of this.priceHistories){
  //     for(let coef of this.coefficients){
  //       var str = new Array<string>();
  //       str.push(priceHistory.ProductType.Name);
  //       str.push(coef.Type);
  //       str.push((priceHistory.Price*coef.Value).toString(),'RSD');
  //       retVal.push(str);
  //     }
  //   }
  //   return retVal;
  // }
  createPricelist() : PricelistElement[]{
    var retVal = new Array<PricelistElement>();
    for(let priceHistory of this.priceHistories){
      for(let coef of this.coefficients){
        var pricelistEl = new PricelistElement();
        pricelistEl.pricelist = priceHistory.ProductType.Name;
        pricelistEl.person = coef.Type;
        pricelistEl.price = priceHistory.Price*coef.Value;
        retVal.push(pricelistEl);
      }
    }
    return retVal;
  }
}
