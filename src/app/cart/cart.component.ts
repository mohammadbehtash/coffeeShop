import { Component, Injector, OnInit } from '@angular/core';
import { DirectionComponent } from "../direction/direction.component";
import { HeaderService } from '../header/header.service';
import { AuthService } from '../auth/auth.service';
import { Cart, Items } from '../Models/creator.model';
import { RouterModule } from '@angular/router';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DirectionComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items!: Items[]
  totalPrice!: number
  constructor(private headerService: HeaderService, private authService: AuthService, private cartService: CartService,
    private injector: Injector
  ) { }

  ngOnInit(): void {

    this.authService.refreshToken().subscribe({
      complete: () => {
        this.cartService.getShowUserCart().subscribe();
        this.ShowCart()
      }
    })
  }
  decimalProduct(event: Event, id: string) {
    event.stopPropagation()
   
    this.authService.refreshToken().subscribe({
      complete: () => {
           this.cartService.decemalProdaucCart(id).subscribe({
      complete: () => {
        this.cartService.getShowUserCart().subscribe();
        const toastr = this.injector.get(ToastrService);
        toastr.success(`تعداد محصول مورد نظر یک مورد کاهش شد`, '');
      }
    })
      }
    })

 
  }
  incrementProduct(event: Event, id: string) {
    event.stopPropagation()
    
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.cartService.incrementProdaucCart(id).subscribe({
          complete: () => {
            this.cartService.getShowUserCart().subscribe();
            const toastr = this.injector.get(ToastrService);
            toastr.success(`تعداد محصول مورد نظر یک مورد افزایش یافت`, '');
          }
        })
      }
    })
  }
  removeProduct(event: Event, id: string) {
    event.stopPropagation()
   
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.cartService.deleteProductCart(id).subscribe({
          complete: () => {
            this.cartService.getShowUserCart().subscribe();
            const toastr = this.injector.get(ToastrService);
            toastr.warning(`محصول مورد نظر از سبد خرید شما حذف شد`)
          }
        })
      }
    })
  }

  ShowCart() {
    this.cartService.cartItems$.subscribe({
      next: (cart: Cart | null) => {
        if (cart) {
          // console.log(cart);
          this.items = cart.items;
          
          this.totalPrice = this.items.reduce((total, item) => {
            const discountAmount = (item.productId.price * item.productId.discount) / 100;
            const discountedPrice = item.productId.price - discountAmount;
            return total + (discountedPrice * item.quantity);
          }, 0);

        }
      }
    })
  }

  // payment(){
  //   this.authService.refreshToken().subscribe({
  //     complete:()=>{
  //       this.cartService.buyProducts().subscribe({
  //         next:(res:any)=>{
  //           console.log(res);
            
  //         },
  //         complete:()=>{
  //           this.cartService.getShowUserCart().subscribe();
  //           const toastr = this.injector.get(ToastrService);
  //           toastr.warning(`محصول مورد نظر خرید شد`)
  //         }
  //       })
  //     }
  //   })
  // }

  payment() {
    const form={
      province:'province' ,
      city: 'city',
      address:'address' ,
      postalCode:'postalCode' ,
      nationalCode: 'nationalCode'
    }
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.cartService.buyProducts(form).subscribe({
          next: (res: any) => {
            console.log(res);
            
            if (res.paymentUrl) {
              // ارسال کاربر به صفحه پرداخت
              window.location.href = res.paymentUrl;
            } else {
              console.error('Payment initiation failed');
            }
          },
          error: (err) => {
            console.error('Error during purchase', err);
          }
        });
      }
    });
  }

}
