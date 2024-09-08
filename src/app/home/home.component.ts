import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductBoxComponent } from '../product-box/product-box.component';
import Swiper from 'swiper';
import { HomeService } from './home.service';
import { Product } from '../Models/product.model';
import { RouterModule } from '@angular/router';
import { CateGory } from '../Models/category.model';
import { Article } from '../Models/article.model'; 
import { JalaliDatePipe } from '../jalali-date.pipe';
import { Subscription } from 'rxjs';
import { ArticleBoxComponent } from "../article-box/article-box.component";
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductBoxComponent, RouterModule, JalaliDatePipe, ArticleBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy {
pruduct!:Product[]
category!:CateGory[]
bestSeller!:Product[]
articles!:Article[]
USbscription:Subscription|undefined
USbscription2:Subscription|undefined
USbscription3:Subscription|undefined
constructor(private homeservice:HomeService){}

ngAfterViewInit(): void {
  if (typeof document !== 'undefined'){
    new Swiper('.swiper', {
    slidesPerView: 2,
    spaceBetween: 14,
    loop: true,
    navigation: {
      nextEl: '#swiper-button-next-custom',
      prevEl: '#swiper-button-prev-custom'
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 14
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  }); 
}

}



ngOnInit(): void {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    AOS.init({duration: 3000, once: false });
    console.log('AOS initialized');
  }
  
  this.USbscription=this.homeservice.getAllProduct().subscribe({
    next:(data:Product[])=>{
      // console.log(data);
      
      const dataCopy = [...data];
    
    this.pruduct = dataCopy.splice(0, 8);

      this.bestSeller = data.filter(product =>Number(product.Score) >= 2);
    
      
    }
  })
  
  this.USbscription2=this.homeservice.showAllCategory().subscribe({
    next:(data:CateGory[])=>{
      this.category=data
    }
  })
  
  this.USbscription3=this.homeservice.showAllArticlse().subscribe({
    next:(data:Article[])=>{
      // console.log(data);
      this.articles=data.splice(0,6)
    }
  })
}

ngOnDestroy(): void {
  this.USbscription?.unsubscribe()
  this.USbscription2?.unsubscribe()
  this.USbscription3?.unsubscribe()
}

}


