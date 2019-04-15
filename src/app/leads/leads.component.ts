import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { LeadsService } from './leads.service';
import { Lead } from './lead';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'mobilephone', 'postalcode', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Lead>();
  selectedLead: Lead = new Lead();
  loading = false;
  leads: Lead[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public leadsService: LeadsService) {}

  ngOnInit() {
    console.log('ngOnInit leads component START ' );
    this.getLeads();
    console.log('ngOnInit leads component END ' );
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit() - Start');

    console.log('ngAfterViewInit() - End');
  }


  getLeads(): void {
    console.log('getEvent leads component before service START ' );
    this.leadsService.getLeads()
      .subscribe(leads => {
        console.log('getEvent leads component START ' );
        this.leads = leads;
        console.log('getEvent leads component data ' + this.leads );
        this.dataSource = new MatTableDataSource(this.leads);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('getEvent leads component END ' );
      }, error => {
        console.log('getLeads components error' + error);
      });
  }

  updateLead(lead: Lead): void {
    if (this.selectedLead.id !== undefined) {
      console.log('update lead component id ', lead.id);
      lead.systemmodstamp = new Date();
      this.leadsService.updateLead(lead)
        .subscribe(updatedLead => {
          // this.leads.push(updatedLead);
          // this.dataSource = new MatTableDataSource(this.leads);
        });
    } else {
      lead.createddate = new Date();
      lead.systemmodstamp = new Date();
      console.log('new lead first name ', lead.firstname);
      console.log('new lead last name ', lead.lastname);
      console.log('new lead email ', lead.email);
      console.log('new lead mobile ', lead.mobilephone);
      lead.name = lead.firstname + ' ' + lead.lastname;
      console.log('new lead name ', lead.name);
      lead.sms_opt_in__c = false;
      this.leadsService.createLead(lead)
        .subscribe(newLead => {
          this.leads.push(newLead);
          this.dataSource = new MatTableDataSource(this.leads);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }
    this.selectedLead = new Lead();
  }
  editLead(lead: Lead): void {
    this.selectedLead = lead;
  }


deleteLead(lead: Lead): void {
    this.leads = this.leads.filter(l => l !== lead);
    this.leadsService.deleteLead(lead).subscribe( res => {
      console.log(' delete response : ', res);
      this.dataSource = new MatTableDataSource(this.leads);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
  error => {
      console.log('Error deleting record ', error);
    });
}

  // async refresh() {
  //   this.loading = true;
  //   const data = this.leads;
  //   this['dataSource'].data = data;
  //   this.loading = false;
  // }

}
