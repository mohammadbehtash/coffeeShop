import { Component, Injector, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { OderService } from './oder.service';
import { OrderAdmin } from '../../Models/order.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-oders',
  standalone: true,
  imports: [JalaliDateSimplePipe,CommonModule],
  templateUrl: './oders.component.html',
  styleUrl: './oders.component.css'
})
export class OdersComponent implements OnInit{
order!:OrderAdmin[]
newOrderNumber!:OrderAdmin[]
orderNumber:number=0
  constructor(private adminService:AdminService,private authService:AuthService,private orderService:OderService, private injector: Injector){}

  ngOnInit(): void {
    this.adminService.setTitle('فروش')
  this.ShowAllOrders()
  }
  ShowAllOrders(){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.orderService.GetShowAllOrders().subscribe({
          next:(res:OrderAdmin[])=>{
            
            this.order=[...res]
            // .filter(order=>order.status=='Completed')
            this.newOrderNumber=res
            this.orderNumber=this.newOrderNumber.filter(order=>order.isSend===0).length
            this.orderService.updatedNewOrder(this.orderNumber)
          }
        })
      }
    })
  }

  sendProduct(id:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.orderService.PutsendProduct(id).subscribe({
          complete:()=>{
            this.ShowAllOrders()
            const toastr = this.injector.get(ToastrService);
              toastr.success(`محصول به کاربر ارسال شد`, '');
          }
        })
      }
    })
    
  }
}
