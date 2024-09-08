import { Component, OnInit } from '@angular/core';
import { DirectionComponent } from "../direction/direction.component";
import { ArticleService } from './article.service';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Article } from '../Models/article.model'; 
import { JalaliDatePipe } from "../jalali-date.pipe";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DirectionComponent, JalaliDatePipe,RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit{
  articleHref!:string
  article!:Article
  articles!:Article[]
  blogContent!: SafeHtml;

  constructor(private articleService:ArticleService,private activeRoute: ActivatedRoute,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params:ParamMap)=>{
      this.articleHref = params.get('href')!
      this.articleService.showArticle(this.articleHref).subscribe({
        next:(data:Article)=>{
          this.article=data
          this.blogContent=this.sanitizer.bypassSecurityTrustHtml(data.body)
          this.articleService.getRelatedArticle(this.article.href).subscribe({
            next:(data:Article[])=>{
              // console.log(data);
              this.articles=data
            
            }
          })
          
        }
      })
    })
  }

}
