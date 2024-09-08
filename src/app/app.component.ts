import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AllService } from './service/all.service';
import { filter, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from "./auth/login/login.component";
import { SharedModule } from './shared/shared.module';
import { AuthFormComponent } from "./auth/auth-form/auth-form.component";
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    HeaderComponent,
    CommonModule,
    FooterComponent,
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  navOpen: boolean = false;
  isHeaderHidden: boolean = true;
  isFooterHidden: boolean = true;
  isHeaderAndFooterdisable: boolean = true;
  constructor(private allservice: AllService, private router: Router, private authService: AuthService) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     window.scrollTo(0, 0);
    //   }
    // });
  }


  checkRoute() {
    const currentRoute = this.router.url;
    this.isHeaderHidden = currentRoute.includes('/my-account');
    this.isFooterHidden = currentRoute.includes('/auth');
    this.isHeaderAndFooterdisable=currentRoute.includes('/admin')
  }
  ngOnInit(): void {
    this.subscription = this.allservice.openNav$.subscribe(status => {
      this.navOpen = status 
    })
    this.subscription = this.allservice.openCart$.subscribe(status => {
      this.navOpen = status 
    })

    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkRoute();
    });
















    // this.router.events.pipe(
      // filter(event => event instanceof NavigationEnd),
      // switchMap(() => this.authService.refreshToken()),
    // ).subscribe({
    //   complete: () => {
    //     console.log('accessToken OK');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // });


    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
      // this.authService.refreshToken().subscribe({
      //   complete: () => {
      //     console.log('accessToken OK');
          // this.showName()
          // this.headerService.getShowUserCart().subscribe();
          // this.ShowCart()
          // this.router.events.subscribe((event) => {
          //   if (event instanceof NavigationEnd) {
          //     if (event.url === '/my-account') {
          //       this.isNav = false;
          //     } else {
          //       this.isNav = true;
          //     }
          //   }
          // });
    //     }
    //   })
    // })








  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
