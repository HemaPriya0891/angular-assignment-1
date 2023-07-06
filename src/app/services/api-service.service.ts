import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers_object = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
  })


  httpOptions = {
    headers: this.headers_object
  }
  constructor(private httpClient : HttpClient) { }
  loadDashboardData(params: any): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl, this.httpOptions);
  }

}
