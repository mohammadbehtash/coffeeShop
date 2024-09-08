import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor() { }
}
