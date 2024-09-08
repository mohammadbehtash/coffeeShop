import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../Models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
private BaseUrl = 'http://localhost:4000/'
  constructor() { }
  http=inject(HttpClient)

  showArticle(href:string):Observable<any>{
    return this.http.get<Article>(this.BaseUrl+'articles/'+href)
  }

  getRelatedArticle(href:string):Observable<Article[]>{
    return this.http.get<Article[]>(this.BaseUrl+'articles/related/'+href)
  }
}
