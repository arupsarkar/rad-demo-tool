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
  dataSource = new MatTableDataSource<any>();
  selectedLead: Lead = new Lead();
  loading = false;

  constructor(public leadsService: LeadsService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.leadsService.getLeads();
    this.dataSource.data = data;
    this.loading = false;
  }

}
