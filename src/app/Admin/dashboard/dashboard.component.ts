import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AdminService } from '../admin.service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Admin_model } from '../../Models/adminInfo.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, JalaliDateSimplePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit,OnDestroy{
  adminInfo!:Admin_model
  date!:Date
  currentTime: string = '';
  intervalId: any;

  constructor(private adminService:AdminService,private authService:AuthService,
    @Inject(PLATFORM_ID) private platformId: any,
  ){}
  ngOnInit(): void {
    this.adminService.setTitle('داشبورد')
    this.ShowAdminInfo()
    if (isPlatformBrowser(this.platformId)) {
      // فقط در مرورگر تایمر را شروع می‌کنیم
      this.NewDate();
      this.startClock();
    }
  }
 
  ShowAdminInfo(){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.adminService.ShowAdminInfo().subscribe({
          next:(data:Admin_model)=>{
          
            this.adminInfo=data
          }
        })
      }
    })
  }
  NewDate(){
    this.date=new Date()
  }

  startClock() {
    this.intervalId = setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000); // Update every second
 }
 ngOnDestroy(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
 }
}
