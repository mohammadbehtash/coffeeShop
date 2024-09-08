import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, switchMap } from 'rxjs';
import { CateGory } from '../../Models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService) { }

  GetShowAllCategorise():Observable<CateGory[]>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<CateGory[]>(this.BaseUrl+'category',{headers})
      })
    )
  }

  PostCreateCategory(form:FormData):Observable<CateGory>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<CateGory>(this.BaseUrl+'category',form,{headers})
      })
    )
  }

  PutCategory(form:FormData,id:string):Observable<CateGory>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<CateGory>(this.BaseUrl+'category/'+id,form,{headers})
      })
    )
  }

  DeleteCategory(id:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete(this.BaseUrl+'category/'+id,{headers})
      })
    )
  }
}
