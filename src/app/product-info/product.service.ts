import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../Models/product.model';
import { SendComment } from '../Models/sendComment.mode';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private BaseUrl = 'http://localhost:4000/'

  constructor(private authService:AuthService) { }
  http=inject(HttpClient)

showProductInfo(href:string):Observable<any>{
  return this.http.get<any[]>(this.BaseUrl+'product/'+href).pipe(
    map((res:any[])=>{
      // console.log(res);
      // return res[0]
      const productInfo = res[0];
      if (productInfo && productInfo.product) {
        productInfo.product.Score = productInfo.Score;
        return productInfo;
      }
      // return null;
    })
  )
}

postSendComment(form:SendComment):Observable<any>{
  return this.authService.gettoken().pipe(
    switchMap((accessToken:string)=>{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      return this.http.post<SendComment>(this.BaseUrl+'comment',form,{headers})
    })
  )

}
getRelatedProduct(href:string):Observable<Product[]>{
  return this.http.get<Product[]>(this.BaseUrl+'product/related/'+href)
}
}
