import { Component, Injector, OnInit } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ArticleService } from './article.service';
import { Article } from '../../Models/article.model';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";
import { CommonModule } from '@angular/common';
import { Article_admin } from '../../Models/article-admin.model';
import { CategoryService } from '../category/category.service';
import { CateGory } from '../../Models/category.model';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-article-admin',
  standalone: true,
  imports: [EditorComponent, CommonModule, ReactiveFormsModule, ConfirmModalDeleteComponent],
  templateUrl: './article-admin.component.html',
  styleUrl: './article-admin.component.css'
})
export class ArticleAdminComponent implements OnInit {
  apiKey = 'll1ij6ym3x11jw76y93a7rkdq5dmm4odzuoeg0on2s4oajcb'
  articleForm!: FormGroup
  cover: any
  categoryID: string = ''
  isEdit: boolean = false
  article!: Article_admin[]
  articlePublish!: Article_admin[]
  articlePublishZero: number=0
  htmlContent: string = '';
  category!: CateGory[]
  articleId: string = ''

  constructor(private adminService:AdminService,private authService: AuthService, private articleService: ArticleService, private categoriService: CategoryService,
    private injector: Injector
  ) { }
  ngOnInit(): void {
    this.adminService.setTitle('مقالات')
    this.articleForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      body: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      href: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      categoryID: new FormControl(null, [Validators.required]),
      cover: new FormControl(null, [Validators.required]),
    })
    this.ShowAllArticle()
    this.ShowAllCategores()
  }
  adressCover(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.cover = input.files[0]
    }
  }
  categoryId(event: Event) {
    const input = event.target as HTMLInputElement
    if (input) {
      this.categoryID = input.value
    }
  }
  ShowAllArticle() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.articleService.GetShowAliiArticles().subscribe({
          next: (res: Article_admin[]) => {
            
            this.article = [...res]
            this.articlePublish=res
            this.articlePublishZero=this.articlePublish.filter(article=>article.publish===0).length
            this.articleService.updatedArticlePublish(this.articlePublishZero)
            
          }
        })
      }
    })
  }
  ShowAllCategores() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.categoriService.GetShowAllCategorise().subscribe({
          next: (res: CateGory[]) => {
            
            this.category = res
          }
        })
      }
    })
  }
  onBlur(): void {
    this.articleForm.controls['body'].setValue(this.htmlContent);
  }

  sendArticle() {
    if(this.isEdit){
      this.upddatedArticle()
    }else{
       const formdata = new FormData();
    formdata.append("title", this.articleForm.value.title);
    formdata.append("description", this.articleForm.value.description);
    formdata.append("body", this.articleForm.value.body);
    formdata.append("href", this.articleForm.value.href);
    formdata.append("categoryID", this.categoryID);
    formdata.append("cover", this.cover);

    this.authService.refreshToken().subscribe({
      complete: () => {
        this.articleService.PostSendArticle(formdata).subscribe({
          complete: () => {
            this.ShowAllArticle()
            this.articleForm.reset()
            const toastr = this.injector.get(ToastrService);
            toastr.success(`مقاله جدید اضافه شد `, '');
          }
        });
      }
    });
    }
   
  }

  selectid(id: string, body: string, description: string, href: string, title: string,) {
    this.articleForm.get('body')?.setValue(body)
    this.articleForm.get('description')?.setValue(description)
    this.articleForm.get('href')?.setValue(href)
    this.articleForm.get('title')?.setValue(title)
    this.articleId = id
    this.isEdit = true
  }

  upddatedArticle() {
    const formdata = new FormData();
    formdata.append("title", this.articleForm.value.title);
    formdata.append("description", this.articleForm.value.description);
    formdata.append("body", this.articleForm.value.body);
    formdata.append("href", this.articleForm.value.href);
    formdata.append("categoryID", this.categoryID);
    formdata.append("cover", this.cover);

    this.authService.refreshToken().subscribe({
      complete: () => {
        this.articleService.PutArticle(this.articleId, formdata).subscribe({
          complete: () => {
            this.ShowAllArticle()
            this.articleForm.reset()
            const toastr = this.injector.get(ToastrService);
            toastr.success(`مقاله مورد نظر ویراش شد `, '');
            this.isEdit=false
          }
        })
      }
    })
  }

  publizOne(id:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.articleService.PutPublish_one(id).subscribe({
          complete:()=>{
            this.ShowAllArticle()
            
            const toastr = this.injector.get(ToastrService);
            toastr.success(`مقاله مورد نظر نمایش داده شد `, '');
          }
        })
      }
    })
  }
  publizZero(id:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.articleService.PutPublish_zero(id).subscribe({
          complete:()=>{
            this.ShowAllArticle()
           
            const toastr = this.injector.get(ToastrService);
            toastr.warning(`مقاله مورد نظر قابل نمایش نیست `, '');
          }
        })
      }
    })
  }
deleteArticle(id:string){
  this.authService.refreshToken().subscribe({
    complete:()=>{
      this.articleService.Deletearticle(id).subscribe({
        complete:()=>{
          this.ShowAllArticle()
          
          const toastr = this.injector.get(ToastrService);
          toastr.success(`مقاله مورد نظر قابل حذف شد `, '');
        }
      })
    }
  })
}

}
