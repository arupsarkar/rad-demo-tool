import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Lead} from '../leads/lead';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl = 'https://rad-demo-tool.herokuapp.com'; // URL to web api
  constructor(private http: HttpClient) { }

  /** GET Leads from the server */
  getContacts (): Observable<Contact[]> {
    const url = this.baseUrl + '/api/contacts';
    console.log('getContacts URL : ' + url);
    return this.http.get<Contact[]>(url)
      .pipe(
        tap(res => {
          this.log('fetched contacts : ' + res);
          console.log(JSON.stringify(res));
        }),
        catchError(this.handleError<Contact[]>('getContacts', []))
      );
  }

  createContact(contact: Contact): Observable<Contact> {
    const url = this.baseUrl + '/api/contacts';
    console.log('create contact url ', url);
    return this.http.post(url, contact, httpOptions).pipe(
      tap((newContact: Contact) => {
        console.log('new contact id ', newContact.id);
      }),
      catchError(this.handleError<Contact>('add Contact'))
    );
  }

  updateContact(contact: Contact): Observable<any> {
    const id = typeof contact === 'number' ? contact : contact.id;
    console.log('updated id : ', id);
    const url = `${this.baseUrl}/api/contacts/${id}`;
    return this.http.put(url, contact, httpOptions).pipe(
      tap( res => {
        this.log(`updated contact`);
        console.log('Updated contact id : ' + res);
      }),
      catchError(this.handleError<any>('Error updating contact'))
    );
  }

  deleteContact (contact: Contact | number): Observable<Contact> {
    const id = typeof contact === 'number' ? contact : contact.id;
    console.log('Deleted id : ', id);
    const url = `${this.baseUrl}/api/contacts/${id}`;
    return this.http.delete<Contact>(url, httpOptions).pipe(
      tap( res => {
        console.log('deleteContact : ', res);
        this.log(`deleted contact id=${id}`);
      }),
      catchError(this.handleError<Contact>('deleteLead'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(' Contacts service : ', message);
  }
}
