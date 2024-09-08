import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { OrderAdmin } from '../../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OderService {
  private BaseUrl = 'http://localhost:4000/'
  http = inject(HttpClient)
  private NewOrders=new BehaviorSubject<number>(0)
  newOrder$=this.NewOrders.asObservable()
  constructor(private authService: AuthService) { }

  updatedNewOrder(cunt:number){
    this.NewOrders.next(cunt)
  }

  GetShowAllOrders(): Observable<OrderAdmin[]> {
    return this.authService.gettoken().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<OrderAdmin[]>(this.BaseUrl + 'product/show-all-orders', { headers })
      })
    )
  }

  PutsendProduct(id:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put(this.BaseUrl+'product/ordr-isend/'+id,null,{headers})
      })
    )
  }
}
