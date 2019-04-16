import {Component, OnInit, ViewChild} from '@angular/core';
import { Contact } from './contact';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ContactsService } from './contacts.service';


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
    if (this.selectedContact.id !== undefined) {
      console.log('update contact component id ', contact.id);
      contact.systemmodstamp = new Date();
      this.contactsService.updateContact(contact)
        .subscribe(updatedContact => {
          console.log('Updated contact : ', updatedContact);
        });
    } else {
      contact.createddate = new Date();
      contact.systemmodstamp = new Date();
      contact.name = contact.firstname + ' ' + contact.lastname;
      console.log('new contact name ', contact.name);
      contact.sms_opt_in__c = false;
      this.contactsService.createContact(contact)
        .subscribe(newContact => {
          this.contacts.push(newContact);
          this.dataSource = new MatTableDataSource(this.contacts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
    }
    this.selectedContact = new Contact();


  }
  deleteContact(contact: Contact): void {
    console.log('Deleted contact ', JSON.stringify(contact));
    this.contacts = this.contacts.filter(l => l !== contact);
    this.contactsService.deleteContact(contact).subscribe( res => {
        console.log(' delete response : ', res);
        this.dataSource = new MatTableDataSource(this.contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('Error deleting record ', error);
      });
  }
}
