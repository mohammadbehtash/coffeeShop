import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  private csrfToken?: string ;

  constructor(private http: HttpClient) {}

  async getCsrfToken() {
    const response = await firstValueFrom(this.http.get<{ csrfToken: string }>('http://localhost:4000/csrf/csrf-token'));
    this.csrfToken = response.csrfToken;
    console.log('csrfToken',this.csrfToken);
    
    return this.csrfToken;
  }

  get token() {
    return this.csrfToken;
  }

}
