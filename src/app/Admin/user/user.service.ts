import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, switchMap } from 'rxjs';
import { Creator } from '../../Models/creator.model';
import { UserInfo } from '../../Models/userInfo.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService) { }
  
  getShowAllusers():Observable<Creator[]>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<Creator[]>(this.BaseUrl+'users/',{headers})
      })
    )
  }

  putEditRole(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<string>(this.BaseUrl+'users/role',{id},{headers})
      })
    )
  }

  Remove(id:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete(this.BaseUrl+'users/'+id,{headers})
      })
    )
  }

  update(form:UserInfo):Observable<UserInfo>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<UserInfo>(this.BaseUrl+'auth/updat-user',form,{headers})
      })
    )
  }
}
