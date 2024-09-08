import { Component, Injector, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../home/home.service';
import { AuthService } from '../auth/auth.service';
import { map, Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../header/header.service';
import { CartService } from '../cart/cart.service';
import { Product } from '../Models/product.model';
import { Cart, Items } from '../Models/creator.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent implements OnDestroy {
  @Input() item!: Product
  USbscription: Subscription | undefined
  USbscription2: Subscription | undefined

  constructor(private homeService: HomeService, private authService: AuthService, private injector: Injector,
    private headerService: HeaderService, private cartService: CartService
  ) { }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }


  addtoCart(id: string) {
    this.USbscription = this.authService.refreshToken().subscribe({
      complete: () => {

        this.USbscription2 = this.homeService.PostAddToCart(id).subscribe({
          // next:(res:any)=>{console.log(res);
          // },
          complete: () => {
            this.cartService.getShowUserCart().subscribe()

            const toastr = this.injector.get(ToastrService);
            toastr.success(`محصول ${this.item.title} به سبد خرید شما اظافه شد`, '');
          },
          error: (err: any) => {
            const toastr = this.injector.get(ToastrService);
            toastr.error(err.error.message || 'امکان افزودن محصول به سبد خرید وجود ندارد', '');
            console.log(err);
          }
        })
      }
    })

  }







  ngOnDestroy(): void {
    this.USbscription?.unsubscribe()
    this.USbscription2?.unsubscribe()
  }
}
