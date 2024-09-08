import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { filter, Subject, switchMap } from 'rxjs';
import { AllService } from '../../service/all.service';
import { CommonModule } from '@angular/common';
import { IndexService } from './index.service';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  username: string = ''
  showNavMobaile:boolean=false

  constructor(private authService: AuthService, private indexService:IndexService,private allservice:AllService, private router:Router){}

  toggleDarkMode() {
    const isDark = localStorage.getItem('dark') ? false : true
    this.allservice.setDarkMode(isDark)
  }
  toggelNav(status: boolean) {
    this.indexService.setOpenNav(status)
  }

  logout(){
    this.authService.logoutUser().subscribe({
      complete:()=>{
        this.router.navigate(['/'])
        
      }
      
    })
  }


  showName() {
    this.authService.showUserNameInNav().subscribe({
      next: (res: any) => {
        this.username = res[0].username
        console.log(this.username);

      },
      complete: () => {
        console.log('نام کاربر با موفقیت گرفته شد');
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    this.indexService.openNav$.subscribe(status => {
      this.showNavMobaile = status
    })


    this.authService.refreshToken().subscribe({
      complete: () => {
        // console.log('accessToken OKdddddd');
        this.showName()
      }
    })

  }
 

}
