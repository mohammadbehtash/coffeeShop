import { AfterViewInit, Component, ElementRef, inject, Injector, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { DirectionComponent } from "../direction/direction.component";
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { Product } from '../Models/product.model';
import { CommonModule } from '@angular/common';
import { ObjectPi } from '../Models/objectProductInfo.model';
import { Comment } from '../Models/comment.model';
import { JalaliDatePipe } from "../jalali-date.pipe";
import { AuthService } from '../auth/auth.service';
import { SendComment } from '../Models/sendComment.mode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../home/home.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductBoxComponent } from "../product-box/product-box.component";
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [DirectionComponent, CommonModule, JalaliDatePipe, ReactiveFormsModule, ProductBoxComponent,RouterModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css'
})
export class ProductInfoComponent implements AfterViewInit,OnInit{
  productHref:string=''
  object!:ObjectPi
  product!:Product
  relayted!:Product[]
  Comment!:Comment[]
  USbscription2:Subscription|undefined
  chate:boolean=false
  commentForm!:FormGroup
  @ViewChild('RegisterComment', { static: false }) targetButton!: ElementRef
  
  constructor(private productService:ProductService,private authService:AuthService, private activeRoute: ActivatedRoute,
    private homeService:HomeService,private injector: Injector,private cartService:CartService
  ){}
  // toastr = this.injector.get(ToastrService);
 

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
  // scrollToButton() {
  //   this.targetButton.nativeElement.scrollIntoView({ behavior: 'smooth' });
    
  // }
  scrollToButton() {
    const offset = 200; // فاصله از بالای صفحه
    const yPosition = window.scrollY + this.targetButton.nativeElement.getBoundingClientRect().top - offset;

    window.scrollTo({
      top: yPosition,
      behavior: 'smooth'
    });
  }



  ngOnInit(): void {
  this.USbscription2=this.activeRoute.paramMap.subscribe((params:ParamMap)=>{
      this.productHref = params.get('href')!

  this.productService.showProductInfo(this.productHref).subscribe({
    next:(data:ObjectPi)=>{
      
      
      this.object=data
      this.product=this.object.product
      this.Comment=this.object.comment
      
      this.productService.getRelatedProduct(this.product.href).subscribe({
        next:(data:Product[])=>{
          this.relayted=data
          
          
        }
      })
    }
  })
  })

this.commentForm=new FormGroup({
  body:new FormControl(null,[Validators.required]),
  score:new FormControl(5,[Validators.required])
})





  }

  addtoCart(id: string) {
    // const toastr = this.injector.get(ToastrService);
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.homeService.PostAddToCart(id).subscribe({
          complete: () => {
            this.cartService.getShowUserCart().subscribe()

            const toastr = this.injector.get(ToastrService);
           
            toastr.success(`محصول ${this.product.title} به سبد خرید شما اضافه شد`, '');
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      error: (err: any) => {
        const toastr = this.injector.get(ToastrService);
        toastr.error('خطای احراز هویت', 'خطا');
      }
    });
  }

  sendComment(href: string) {
    
    const form: SendComment = {
      body: this.commentForm.value.body,
      productHref: href,
      score: this.commentForm.value.score
    };
  
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.productService.postSendComment(form).subscribe({
          complete:() => {
            this.commentForm.reset();
            const toastr = this.injector.get(ToastrService);
            toastr.success('کامنت شما ثبت شد. بعد از تایید مدیران به اشتراک گذاشته می‌شود', 'ارسال کامنت');
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              const toastr = this.injector.get(ToastrService);
              toastr.error('ابتدا باید وارد حساب کاربری خود شوید', 'خطای ورود');
            } else {
              const toastr = this.injector.get(ToastrService);
              toastr.error('خطایی رخ داده است. دوباره تلاش کنید', 'خطا');
            }
          }
        });
      },
      error: (err: any) => {
        const toastr = this.injector.get(ToastrService);
        toastr.error('خطای احراز هویت', 'خطا');
      }
    });
  }
  
    
  

  ngAfterViewInit(): void {
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
