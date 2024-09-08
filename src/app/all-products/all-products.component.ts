import { Component, OnDestroy, OnInit } from '@angular/core';
import { DirectionComponent } from "../direction/direction.component";
import { ProductBoxComponent } from "../product-box/product-box.component";
import { Product } from '../Models/product.model';
import { HomeService } from '../home/home.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../Models/article.model'; 
import { JalaliDatePipe } from "../jalali-date.pipe";
import { Subscription } from 'rxjs';
import { ArticleBoxComponent } from "../article-box/article-box.component";


@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [DirectionComponent, ProductBoxComponent, JalaliDatePipe, ArticleBoxComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent implements OnInit ,OnDestroy{
  pruduct!: Product[]
  categoryName!: string
  title: string = ''
  article!:Article[]
  USbscription:Subscription|undefined
  USbscription2:Subscription|undefined
  USbscription3:Subscription|undefined
  USbscription4:Subscription|undefined
  constructor(private homeservice: HomeService, private activeRoute: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    
    this.loadContent(this.router.url)
    
   this.USbscription= this.router.events.subscribe(()=>{
      this.loadContent(this.router.url)
})
}

private loadContent(curenrUrl:string):void{
  if(curenrUrl.includes('/product')){
    this.title='تمامی محصولات'
    this.USbscription2=this.activeRoute.paramMap.subscribe((params:ParamMap)=>{
      this.categoryName = params.get('href')!
      if(this.categoryName){
        this.USbscription3=this.homeservice.ShowproductInCategory(this.categoryName).subscribe((res:Product[])=>{
          this.pruduct=res
        })
      }else{
        this.USbscription4=this.homeservice.getAllProduct().subscribe((data:Product[])=>{
          this.pruduct=data
        })
      }
    })
  }else if(curenrUrl.includes('/articles')){
    this.title='مطالب خواندنی'
    this.homeservice.showAllArticlse().subscribe({
      next:(data:Article[])=>{
        console.log(data);
        this.article=data
      }
    })
  }
}


ngOnDestroy(): void {
  this.USbscription?.unsubscribe()
  this.USbscription2?.unsubscribe()
  this.USbscription3?.unsubscribe()
  this.USbscription4?.unsubscribe()
}
}
