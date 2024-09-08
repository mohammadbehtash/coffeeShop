import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { AuthService } from '../../auth/auth.service';
import { Order } from '../../Models/order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{
order!:Order
  constructor(private orderService:OrderService,private authService:AuthService){}

  ngOnInit(): void {
this.authService.refreshToken().subscribe({
  complete:()=>{
    this.orderService.showUserOrders().subscribe({
      next:(data:Order)=>{
        console.log(data);
        this.order=data
      }
    })

  }
})
  }

  
}
