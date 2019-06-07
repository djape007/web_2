import { Component, OnInit, forwardRef, Inject, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { TicketService } from '../services/ticket.service';
import { SoldTicket } from 'src/models/sold-ticket';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-check-ticket',
  templateUrl: './check-ticket.component.html',
  styleUrls: ['./check-ticket.component.css']
})
export class CheckTicketComponent implements OnInit {

  constructor(@Inject(forwardRef(() => HomeComponent)) private _parent: HomeComponent, private _ticketService: TicketService) { }
  validSoldTickets: Array<SoldTicket>;

  selectedRowIndex: number = -1;
  selectedRowElement: any;
  displayedColumns: string[] = ['Id'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this._parent.prikaziDesniMeni();
    this.getAllSoldValidTickets();
  }

  getAllSoldValidTickets() {
    this._ticketService.getAllSoldValidTickets().subscribe(
      data => {
        this.validSoldTickets = data;
        this.dataSource = new MatTableDataSource(this.validSoldTickets);
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectTicket(row: any){
    this.selectedRowIndex = row.Id;
    this.selectedRowElement = row;
  }

}
