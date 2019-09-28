import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endpointStart = '/api/company/';
  searchData;

  constructor(private http: HttpClient) { }

  searchCompany(body : any) : Observable<ICompany[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<ICompany[]>(`${this.endpointStart}search`, JSON.stringify(body), httpOptions);
  }

  getAllCategories() : Observable<String[]> {
    return this.http
      .get<String[]>(`${this.endpointStart}categories/all`);
  }

  getAllCompanies() : Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>(this.endpointStart)
      // .catch(this.handleError);
  }

  // handleError(error: HttpErrorResponse) {
  //   return Observable.throw(error.message || 'Server error');
  // }
}
