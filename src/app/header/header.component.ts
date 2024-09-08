import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPTY, filter, finalize, Subject, Subscription, switchMap } from 'rxjs';
import { AllService } from '../service/all.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { HeaderService } from './header.service';
import { Cart, Creator, Items } from '../Models/creator.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Search } from '../Models/search.mode';
import { Article } from '../Models/article.model'; 
import { Product } from '../Models/product.model';
import { CartService } from '../cart/cart.service';
import { MenuService } from '../Admin/menu/menu.service';
import { Menu, MenuParent } from '../Models/menu.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  navOpen: boolean = false;
  CartOpen: boolean = false;
  submenu: boolean = false
  username: string = 'ورود / ثبت نام'
  items!: Items[]
  totalPrice!: number
  searchForm!: FormGroup
  searchProducts!: Product[]
  searchArticles!: Article[]
  isLoggedIn: boolean = false;
  menu!:MenuParent[]
  isInputFocused: boolean = false;

  private subscriprion: Subscription | undefined
  private subscriprion2: Subscription | undefined
  private USauthservice: Subscription | undefined
  private USauthservice2: Subscription | undefined
  private USauthservice3: Subscription | undefined



  constructor(public appservice: AllService, private authService: AuthService, private routre: Router,
    private headerService: HeaderService, private cartService: CartService,private menuService:MenuService
  ) { }


  toggelNav(status: boolean) {
    this.appservice.setOpenNav(status)
  }
  toggelCart(status: boolean) {
    this.appservice.setOpenCart(status)
  }
  toggleDarkMode() {
    const isDark = localStorage.getItem('dark') ? false : true
    this.appservice.setDarkMode(isDark)
  }

  showName() {
    this.USauthservice2 = this.authService.showUserNameInNav().subscribe({
      next: (res: Creator[]) => {
        this.username = res[0].username
        console.log(res);

      },
      complete: () => {
        console.log('نام کاربر با موفقیت گرفته شد');
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }


  ShowCart() {

    this.cartService.cartItems$.subscribe({
      next: (cart: Cart | null) => {
        if (cart) {
          this.items = cart.items;
          // console.log(this.items);

          this.totalPrice = this.items.reduce((total, item) => {
            const discountAmount = (item.productId.price * item.productId.discount) / 100;
            const discountedPrice = item.productId.price - discountAmount;
            return total + (discountedPrice * item.quantity);
          }, 0);

        }
      }
    })
  }


  ngOnInit() {
this.ShowAllMenu()


    this.searchForm = new FormGroup({
      search: new FormControl(null, [Validators.required])
    })

    this.appservice.checkDarkMode();

    // submenu
    this.subscriprion = this.appservice.openNav$.subscribe(status => {
      this.navOpen = status
    })
    // cart
    this.subscriprion2 = this.appservice.openCart$.subscribe(status => {
      this.CartOpen = status
    })


    //  =============================
    this.refreshHeaderData();
    this.authService.isLoggedis$.subscribe(isLoggedin => {
      if (!isLoggedin) {
        this.username = 'ورود / ثبت نام'
        this.items=[]
      } else {
       

        this.routre.events.pipe(
          filter(event => event instanceof NavigationEnd),
        ).subscribe({
          next: () => {
            this.refreshHeaderData();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    })
   
    // ====================

  }
  private refreshHeaderData() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.showName(); // نمایش نام کاربر
        this.cartService.getShowUserCart().subscribe(); // دریافت اطلاعات سبد خرید
        this.ShowCart(); // نمایش سبد خرید
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  SearchGlobal() {
    const value = this.searchForm.value.search
    if (this.searchForm.value.search !== '') {
      this.headerService.GetSearchGlobal(value).subscribe({
        next: (data: Search) => {
          this.searchArticles = data.article
          this.searchProducts = data.product
          

        }
      })
    } else {
      this.isInputFocused = true;
      this.searchProducts = [{
        Score: 0,
        categoryId: undefined!,
        cover: '',
        createdAt: '',
        creator: '',
        description: '',
        dimensions: 0,
        discount: 0,
        href: '',
        number: 0,
        numberHygiene: '',
        packageWeight: 0,
        price: 0,
        title: '',
        type: '',
        brand: '',
        code: '',
        combinations: '',
        updatedAt: '',
        weight: 0,
        __v: 0,
        _id: ''
      }]
      this.searchArticles = [{
        title: '', cover: '',
        body: '',
        categoryID: '',
        createdAt: '',
        creator: undefined!,
        description: '',
        href: '',
        publish: 0,
        updatedAt: '',
        __v: 0,
        _id: ''
      }]
    }


  }

  ngOnDestroy(): void {
    this.subscriprion?.unsubscribe()
    this.subscriprion2?.unsubscribe()
    this.USauthservice?.unsubscribe()
    this.USauthservice2?.unsubscribe()
    this.USauthservice3?.unsubscribe()
  }
 
  ShowAllMenu(){
    this.menuService.ShowGetMenu().subscribe({
      next:(res:MenuParent[])=>{
        this.menu=res
      }
    })
  }
  
}



