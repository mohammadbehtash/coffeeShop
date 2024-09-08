import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Info } from '../../Models/info.model';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  constructor(private authService:AuthService) {}

  ShowInfo():Observable<Info>{
    return this.http.get<Info>(this.BaseUrl+'info/index')
  }

  DeleteInfo(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete<string>(this.BaseUrl+'info/info-delet/'+id,{headers})
      })
    )
  }
  
  UpdateInfo(id:string,form:FormData):Observable<Info>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<Info>(this.BaseUrl+'info/info-update/'+id,form,{headers})
      })
    )
  }

  PostCreatedInfo(form:FormData):Observable<Info>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<Info>(this.BaseUrl+'info/info-create',form,{headers})
      })
    )
  }
}
