import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserInfo, UserInfoPassword } from '../../Models/userInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private BaseUrl = 'http://localhost:4000/'
  constructor(private authService:AuthService) { }
  http=inject(HttpClient)

  updeteUsertInfos(form:any):Observable<UserInfo>{
    return this.authService.getCookie().pipe(
      switchMap((accessToken:string)=>{
        const headers=new HttpHeaders(({ 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`}))

        return this.http.put<UserInfo>(this.BaseUrl+'users/',form,{headers})
      })
    )
  }
  updeteUsertPassword(form:any):Observable<UserInfoPassword>{
    return this.authService.getCookie().pipe(
      switchMap((accessToken:string)=>{
        const headers=new HttpHeaders(({ 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`}))

        return this.http.put<UserInfoPassword>(this.BaseUrl+'users/update-password',form,{headers})
      })
    )
  }
}
