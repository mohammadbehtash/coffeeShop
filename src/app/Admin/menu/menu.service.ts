import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, switchMap } from 'rxjs';
import { Menu, MenuParent } from '../../Models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService) { }

  getShowAllMenus():Observable<Menu[]>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<Menu[]>(this.BaseUrl+'menus/all',{headers})
      })
    )
  }
  
   PostCreateMenu(form:Menu):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post(this.BaseUrl+'menus',form,{headers})
      })
    )
  }
  ShowGetMenu():Observable<MenuParent[]>{
    const headers = new HttpHeaders().set('Content-Type', `application/json`);
    return this.http.get<MenuParent[]>(this.BaseUrl+'menus',{headers})
  }
  
  PutMenu(id:string,form:Menu):Observable<Menu>{
   return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<Menu>(this.BaseUrl+'menus/'+id,form,{headers})
      })
    )
  }
  DeleteMenu(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete<string>(this.BaseUrl+'menus/'+id,{headers})
      })
    )
  }
}
