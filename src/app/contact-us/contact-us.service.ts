import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor() { }


  postContact(form: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.BaseUrl + 'contact-us/', form, { headers });
  }
}
