import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable} from 'rxjs';

import { Search } from '../Models/search.mode';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // getShowUserCart() {
  //   throw new Error('Method not implemented.');
  // }
private BaseUrl = 'http://localhost:4000/'

  constructor(private authService:AuthService) { }
  http=inject(HttpClient)

  GetSearchGlobal(value:string):Observable<Search>{
    return this.http.get<Search>(this.BaseUrl+'search/'+value)
  }

}
