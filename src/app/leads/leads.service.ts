import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lead } from './lead';

const baseUrl = 'http://rad-demo-tool.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) {}

    private async request (method: string, url: string, data?: any) {
      console.log('request ' + JSON.stringify(data));
      const result = this.http.request(method, url, {
        body: data,
        responseType: 'json',
        observe: 'body',
        headers: {}
      });
      return new Promise<any>((resolve, reject) => {
        result.subscribe(resolve as any, reject as any);
      });
    }

  getLeads() {
    return this.request('get', `${baseUrl}/leads`);
  }

  getLead(id: string) {
    return this.request('get', `${baseUrl}/lead/${id}`);
  }

  createLead(lead: Lead) {
    console.log('createLead ' + JSON.stringify(lead));
    return this.request('post', `${baseUrl}/lead`, lead);
  }

  updateLead(lead: Lead) {
    console.log('updateLead ' + JSON.stringify(lead));
    return this.request('post', `${baseUrl}/lead/${lead.id}`, lead);
  }

  deleteLead(id: string) {
    return this.request('delete', `${baseUrl}/lead/${id}`);
  }

}
