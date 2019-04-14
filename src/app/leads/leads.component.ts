import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { LeadsService } from './leads.service';
import { Lead } from './lead';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  // displayedColumns: string[] = ['firstname', 'lastname', 'email', 'mobile', 'edit', 'delete'];
  displayedColumns: string[] = ['firstname'];
  dataSource = new MatTableDataSource<Lead>();
  selectedLead: Lead = new Lead();
  loading = false;
  leads: Lead[];
  constructor(public leadsService: LeadsService) { }

  ngOnInit() {
    this.getLeads();
    this.dataSource = new MatTableDataSource(this.leads);
    // this.refresh();

  }

  getLeads(): void {
    this.leadsService.getLeads()
      .subscribe(leads => {
        console.log('getEvent leads component START ' );
        this.leads = leads;
        console.log('getEvent leads component data ' + this.leads );
        console.log('getEvent leads component END ' );
      }, error => {
        console.log('getLeads components error' + error);
      });
  }
  // async refresh() {
  //   this.loading = true;
  //   const data = this.leads;
  //   this['dataSource'].data = data;
  //   this.loading = false;
  // }

}
