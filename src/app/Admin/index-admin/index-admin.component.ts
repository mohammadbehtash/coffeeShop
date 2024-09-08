import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AllService } from '../../service/all.service';
import { CommnetService } from '../commnets/commnet.service';
import { OderService } from '../oders/oder.service';
import { ArticleService } from '../article-admin/article.service';
import { AuthService } from '../../auth/auth.service';
import { CountactService } from '../countact-us/countact.service';
@Component({
  selector: 'app-index-admin',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './index-admin.component.html',
  styleUrl: './index-admin.component.css'
})
export class IndexAdminComponent implements OnInit, OnDestroy {
  title!: string
  opennav: boolean = false
  iaAcceptCount: number = 0;
  newOrderCount: number = 0;
  articlePublish:number=0
  countactUs:number=0
  constructor(private authService:AuthService,private allService: AllService, private adminService: AdminService, private cdr: ChangeDetectorRef, private renderer: Renderer2, @Inject(PLATFORM_ID) private platformId: Object,
    private commentService: CommnetService,private orderService:OderService,private articleService:ArticleService,private router:Router,private countactService:CountactService) { }
  
  
    private titleSubscription!: Subscription;

  toogleNav(statuse: boolean) {
    this.allService.setOpenNav(statuse)
  }

  ngOnInit(): void {



    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, 'dark:bg-zinc-800')
    }

    this.titleSubscription = this.adminService.title$.subscribe(
      title => {
        setTimeout(() => {
          this.title = title;
        });
      }
    );

    this.allService.openNav$.subscribe(nav => {
      this.opennav = nav
    })
    this.commentService.iaAcceptCount$.subscribe(cunt => {
      this.iaAcceptCount = cunt
    })
    this.orderService.newOrder$.subscribe(cunt=>{
      this.newOrderCount=cunt
    })
    this.articleService.articlePublish$.subscribe(cunt=>{
      this.articlePublish=cunt
    })
    this.countactService.CountentUs$.subscribe(count=>{
      this.countactUs=count
    })
  }


  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(document.body, 'dark:bg-zinc-800')
    }
  }

  logout(){
    this.authService.logoutUser().subscribe({
      complete:()=>{
        this.router.navigate(['/'])
        // console.log('کاربر خارج شد');
      }
      
    })
  }

}
