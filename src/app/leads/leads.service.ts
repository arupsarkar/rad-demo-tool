import { Injectable, } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lead } from './lead';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private baseUrl = 'https://rad-demo-tool.herokuapp.com'; // URL to web api
  constructor(private http: HttpClient) {}


  //   private async request (method: string, url: string, data?: any) {
  //     console.log('request ' + JSON.stringify(data));
  //     const result = this.http.request(method, url, {
  //       body: data,
  //       responseType: 'json',
  //       observe: 'body',
  //       headers: {}
  //     });
  //     return new Promise<any>((resolve, reject) => {
  //       result.subscribe(resolve as any, reject as any);
  //     });
  //   }
  //
  // getLeads() {
  //   return this.request('get', `${baseUrl}/leads`);
  // }
  //
  // getLead(id: string) {
  //   return this.request('get', `${baseUrl}/lead/${id}`);
  // }
  //
  // createLead(lead: Lead) {
  //   console.log('createLead ' + JSON.stringify(lead));
  //   return this.request('post', `${baseUrl}/lead`, lead);
  // }
  //
  // updateLead(lead: Lead) {
  //   console.log('updateLead ' + JSON.stringify(lead));
  //   return this.request('post', `${baseUrl}/lead/${lead.id}`, lead);
  // }
  //
  // deleteLead(id: string) {
  //   return this.request('delete', `${baseUrl}/lead/${id}`);
  // }

  /** GET Leads from the server */
  getLeads (): Observable<Lead[]> {
    const url = this.baseUrl + '/api/leads';
    console.log('getLeads URL : ' + url);
    return this.http.get<Lead[]>(url)
      .pipe(
        tap(res => {
          this.log('fetched leads : ' + res);
          console.log(JSON.stringify(res));
        }),
        catchError(this.handleError<Lead[]>('getLeads', []))
      );
  }

  createLead(lead: Lead): Observable<Lead> {
    const url = this.baseUrl + '/api/leads';
    console.log('create lead url ', url);
    return this.http.post(url, lead, httpOptions).pipe(
      tap((newLead: Lead) => {
        console.log('new lead id ', newLead.id);
      }),
      catchError(this.handleError<Lead>('add Lead'))
    );
  }

  updateLead(lead: Lead): Observable<any> {
    const id = typeof lead === 'number' ? lead : lead.id;
    console.log('updated id : ', id);
    const url = `${this.baseUrl}/api/leads/${id}`;
    return this.http.put(url, lead, httpOptions).pipe(
      tap( res => {
        this.log(`updated lead`);
        console.log('Updated lead id : ' + res);
      }),
      catchError(this.handleError<any>('Error updating lead'))
    );
  }

  deleteLead (lead: Lead | number): Observable<Lead> {
    const id = typeof lead === 'number' ? lead : lead.id;
    console.log('Deleted id : ', id);
    const url = `${this.baseUrl}/api/leads/${id}`;
    return this.http.delete<Lead>(url, httpOptions).pipe(
      tap( res => {
        console.log('deleteLead : ', res);
        this.log(`deleted lead id=${id}`);
      }),
      catchError(this.handleError<Lead>('deleteLead'))
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
    console.log(' Leads service : ', message);
  }
}
