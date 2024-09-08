import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { Product } from '../../Models/product.model';
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../orders/order.service';
import { Order } from '../../Models/order.model';
import { IndexService } from '../index/index.service';
import { HttpClient } from '@angular/common/http';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [RouterModule, JalaliDateSimplePipe],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {
  bestSeller: Product[] | undefined;
  order!: Order
  browserInfo!:string 
  userIp: string | undefined;
  constructor(private homeservice: HomeService, private authService: AuthService, private orderSErvice: OrderService,
    private indexService:IndexService
  ) { 
    this.browserInfo=this.getBrowserInfo();
  }
  http = inject(HttpClient)


  ngOnInit(): void {
    this.getIp();
    this.homeservice.getAllProduct().subscribe({
      next: (data: Product[]) => {
        const dataCopy = [...data];
        
        
        this.bestSeller = data.filter(product => Number(product.Score) >= 2).splice(0, 4);
      }
    })

    this.authService.refreshToken().subscribe({
      complete: () => {
        this.orderSErvice.showUserOrders().subscribe({
          next: (data: Order) => {
            this.order = data
            console.log(this.order);
            
          }
        })
      }
    })
  }

  getBrowserInfo(): string {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf('Firefox') > -1) {
      return 'Mozilla Firefox';
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
      return 'Opera';
    } else if (userAgent.indexOf('Trident') > -1) {
      return 'Internet Explorer';
    } else if (userAgent.indexOf('Edge') > -1) {
      return 'Microsoft Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
      return 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
      return 'Safari';
    } else {
      return 'Unknown Browser';
    }
  }
  
  getIp(): void {
    this.http.get<{ ip: string }>('https://api.ipify.org?format=json')
      .subscribe(response => {
         this.userIp = response.ip;
         console.log('ip',this.userIp);
         
      });
  }
}
