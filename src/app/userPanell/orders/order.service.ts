import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Order } from '../../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BaseUrl = 'http://localhost:4000/'
  constructor(private authService: AuthService) { }
  http = inject(HttpClient)

  showUserOrders(): Observable<Order> {
    return this.authService.getCookie().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders(({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }))
        return this.http.get<Order>(this.BaseUrl + 'product/get-one-order', { headers })
      })
    )
  }
}
