import {Component, OnInit, ViewChild} from '@angular/core';
import { Contact } from './contact';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ContactsService } from './contacts.service';




// const CONTACT_DATA: Contact[] = [
//   {id: 1, accountid: '', createddate: new Date(), email: 'arup.sarkar@salesforce.com', firstname: 'Arup', isdeleted: false, lastname: 'Sarkar', mobilephone: '6462697876', name: 'Arup Sarkar', postalcode: '08840', sms_opt_in__c: false, systemmodstamp: new Date()},
//   {id: 2, accountid: '', createddate: new Date(), email: 'dolores.bungy@salesforce.com', firstname: 'Dolores', isdeleted: false, lastname: 'Bungy', mobilephone: '3473064757', name: 'Dolores Bungy', postalcode: '11355', sms_opt_in__c: false, systemmodstamp: new Date()},
//   {id: 3, accountid: '', createddate: new Date(), email: 'jlung@salesforce.com', firstname: 'Jason', isdeleted: false, lastname: 'Lung', mobilephone: '3472121234', name: 'Jason Lung', postalcode: '11355', sms_opt_in__c: false, systemmodstamp: new Date()},
//   {id: 4, accountid: '', createddate: new Date(), email: 'bjaplin@salesforce.com', firstname: 'Bryan', isdeleted: false, lastname: 'Japlin', mobilephone: '2123451234', name: 'Bryan Japlin', postalcode: '10022', sms_opt_in__c: false, systemmodstamp: new Date()},
// ];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'mobilephone', 'postalcode', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Contact>();
  selectedContact: Contact = new Contact();
  contacts: Contact[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public contactsService: ContactsService) { }

  ngOnInit() {
    console.log('ngOnInit contacts component START ' );
    this.getContacts();
    console.log('ngOnInit contacts component END ' );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getContacts(): void {
    console.log('getEvent leads component before service START ' );
    this.contactsService.getContacts()
      .subscribe(contacts => {
        console.log('getEvent leads component START ' );
        this.contacts = contacts;
        console.log('getContacts contact component data ' + this.contacts );
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('getContacts contacts component END ' );
      }, error => {
        console.log('getContacts components error' + error);
      });
  }

  editContact(contact: Contact): void {
    this.selectedContact = contact;
    console.log('Edit contact ', JSON.stringify(contact));
  }

  updateContact(contact: Contact): void {
    console.log('Updated contact ', JSON.stringify(contact));
  }
  deleteContact(contact: Contact): void {
    console.log('Deleted contact ', JSON.stringify(contact));
  }
}
