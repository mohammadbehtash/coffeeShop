import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../../Models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommnetService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)
  private iaAcceptCountSource=new BehaviorSubject<number>(0)
  iaAcceptCount$ =this.iaAcceptCountSource.asObservable()
  constructor(private authService:AuthService) { }

  updateIaAcceptCount(cunt:number){
    this.iaAcceptCountSource.next(cunt)
  }


  ShowAllComments():Observable<Comment[]>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<Comment[]>(this.BaseUrl+'comment',{headers})
      })
    )
  }
  PutAcceptComment(id:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<Comment[]>(this.BaseUrl+'comment/'+id+'/accept',null,{headers})
      })
    )
  }
  PutRejectComment(id:string):Observable<any>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<Comment[]>(this.BaseUrl+'comment/'+id+'/reject',null,{headers})
      })
    )
  }
  PostSendAnswer(id:string,body:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<string>(this.BaseUrl+'comment/'+id+'/anser',body,{headers})
      })
    )
  }
  DeleteComment(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.delete<string>(this.BaseUrl+'comment/'+id,{headers})
      })
    )
  }
}
