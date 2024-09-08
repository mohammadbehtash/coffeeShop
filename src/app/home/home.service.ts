import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Product } from '../Models/product.model';
import { AuthService } from '../auth/auth.service';
import { CateGory } from '../Models/category.model';
import { Article } from '../Models/article.model'; 

@Injectable({
  providedIn: 'root'
})
export class HomeService {
private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor( private authService:AuthService) { }

  getAllProduct():Observable<Product[]>{
    return this.http.get<Product[]>(this.BaseUrl+'product/')
  }

  PostAddToCart(idProduct:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
       
        
        return this.http.post<any>(this.BaseUrl+'product/cart/add',{productId:idProduct},{headers})
      })
    )
  }

  showAllCategory():Observable<CateGory[]>{
    return this.http.get<CateGory[]>(this.BaseUrl+'category/')
  }

  ShowproductInCategory(href:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.BaseUrl+'product/category/'+href)
  }

  showAllArticlse():Observable<Article[]>{
    return this.http.get<Article[]>(this.BaseUrl+'articles/all')
  }
  
}
