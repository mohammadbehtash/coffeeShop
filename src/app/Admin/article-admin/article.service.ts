import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Article } from '../../Models/article.model';
import { Article_admin } from '../../Models/article-admin.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private BaseUrl = 'http://localhost:4000/'
  http=inject(HttpClient)

  private articlePublishZero=new BehaviorSubject<number>(0)
  articlePublish$=this.articlePublishZero.asObservable()
  constructor(private authService:AuthService) { }

  updatedArticlePublish(cunt:number){
    this.articlePublishZero.next(cunt)
  }


  GetShowAliiArticles():Observable<Article_admin[]>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<Article_admin[]>(this.BaseUrl+'articles',{headers})
      })
    )
  }
  PostSendArticle(form:FormData):Observable<Article_admin>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.post<Article_admin>(this.BaseUrl+'articles',form,{headers})
      })
    )
  }
  PutArticle(id:string,form:FormData):Observable<Article_admin>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<Article_admin>(this.BaseUrl+'articles/update/'+id,form,{headers})
      })
    )
  }
  PutPublish_one(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<string>(this.BaseUrl+'articles/publish-one/'+id,null,{headers})
      })
    )
  }
  PutPublish_zero(id:string):Observable<string>{
    return this.authService.gettoken().pipe(
      switchMap((accessToken:string)=>{
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return this.http.put<string>(this.BaseUrl+'articles/publish-zero/'+id,null,{headers})
      })
    )
  }
  Deletearticle(id:string):Observable<string>{
      return this.authService.gettoken().pipe(
        switchMap((accessToken:string)=>{
          const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
          return this.http.delete<string>(this.BaseUrl+'articles/remove/'+id,{headers})
        })
      )
  }
}
