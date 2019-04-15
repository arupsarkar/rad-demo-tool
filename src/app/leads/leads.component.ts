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
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'mobilephone', 'postalcode', 'edit'];
  dataSource = new MatTableDataSource<Lead>();
  selectedLead: Lead = new Lead();
  loading = false;
  leads: Lead[];
  constructor(public leadsService: LeadsService) {}

  ngOnInit() {
    console.log('ngOnInit leads component START ' );
    this.getLeads();
    console.log('ngOnInit leads component END ' );
    // this.refresh();

  }

  getLeads(): void {
    console.log('getEvent leads component before service START ' );
    this.leadsService.getLeads()
      .subscribe(leads => {
        console.log('getEvent leads component START ' );
        this.leads = leads;
        console.log('getEvent leads component data ' + this.leads );
        this.dataSource = new MatTableDataSource(this.leads);
        console.log('getEvent leads component END ' );
      }, error => {
        console.log('getLeads components error' + error);
      });
  }

  updateLead(lead: Lead): void {
    if (this.selectedLead.id !== undefined) {

    } else {
      this.leadsService.createLead(lead);
    }
    this.selectedLead = new Lead();
  }
  editLead(lead: Lead): void {
    this.selectedLead = lead;
  }
  // async refresh() {
  //   this.loading = true;
  //   const data = this.leads;
  //   this['dataSource'].data = data;
  //   this.loading = false;
  // }

}
