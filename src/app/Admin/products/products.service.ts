import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService) { }

 PostCreateProduct(form:FormData):Observable<Product>{
   return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<Product>(this.BaseUrl+'product',form,{headers})
      })
    )
 }
 PutProduct(form:FormData,id:string):Observable<Product>{
  return this.authService.gettoken().pipe(
    switchMap((accessToken:string)=>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      return this.http.put<Product>(this.BaseUrl+'product/'+id,form,{headers})
    })
  )
 }
 DeleteProduct(id:string):Observable<string>{
  return this.authService.gettoken().pipe(
    switchMap((accessToken:string)=>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
      return this.http.delete<string>(this.BaseUrl+'product/'+id,{headers})
    })
  )
 }
}
