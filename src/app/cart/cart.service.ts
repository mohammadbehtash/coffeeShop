import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../Models/creator.model';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BaseUrl = 'http://localhost:4000/'
  private cartItemsSource = new BehaviorSubject<Cart | null>(null);
  cartItems$ = this.cartItemsSource.asObservable();
  constructor(private authService:AuthService) { }
  http=inject(HttpClient)

  getShowUserCart():Observable<Cart>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken: string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        // console.log(headers);
        return this.http.get<Cart>(this.BaseUrl+'users/cart',{headers}).pipe(
          tap((cart:Cart)=>this.cartItemsSource.next(cart))
        )
      })
    )
  }

  decemalProdaucCart(productId:string):Observable<Product>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers=new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
        return this.http.post<Product>(this.BaseUrl+'product/cart/decimal',{productId},{headers})

      })
    )
  }
  incrementProdaucCart(productId:string):Observable<Product>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers=new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
        return this.http.post<Product>(this.BaseUrl+'product/cart/increment',{productId},{headers})

      })
    )
  }

  deleteProductCart(productId:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers=new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
        return this.http.delete<Product>(this.BaseUrl+'product/cart/remove/'+productId,{headers})
      })
    )
  }

  // buyProducts():Observable<any>{
  //   return this.authService.getCookie().pipe(
  //     switchMap((accessToken:string)=>{
  //       const headers=new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
  //       return this.http.post(this.BaseUrl+'product/purchase-cart',null,{headers})
  //     })
  //   )
  // }
  buyProducts(form:any): Observable<any> {
    return this.authService.getCookie().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post(this.BaseUrl + 'product/purchase-cart',form, { headers });
      })
    );
  }
}
