import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { CategoryService } from './category.service';
import { AuthService } from '../../auth/auth.service';
import { CateGory } from '../../Models/category.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ReactiveFormsModule, JalaliDateSimplePipe, CommonModule, ConfirmModalDeleteComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent  implements OnInit{
  CategoryForm!:FormGroup
  category!:CateGory[]
  cover:any
  id:string=''
  isEdit:boolean=false
  constructor(private adminService:AdminService,private authService:AuthService,private categoriService:CategoryService,
    private injector: Injector
  ){}
  ngOnInit(): void {
    this.adminService.setTitle('دسته بندی ها')

    this.CategoryForm=new FormGroup({
      title:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      href:new FormControl(null,[Validators.required,Validators.minLength(3)]),
      cover:new FormControl(null,[Validators.required])
    })

this.ShowAllCategorise()
  }
  ShowAllCategorise(){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.categoriService.GetShowAllCategorise().subscribe({
          next:(res:CateGory[])=>{
            
            this.category=res
          }
        })
      }
    })
  }

  adressCover(event:Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.cover = input.files[0];
    }
    
  }

  PostCategory(){
    if (this.CategoryForm.invalid) {
      this.CategoryForm.markAllAsTouched();
      return;
    }
    if(this.isEdit){
      const formDate=new FormData()
      formDate.append('title',this.CategoryForm.value.title)
      formDate.append('href',this.CategoryForm.value.href)
      formDate.append('cover',this.cover)
  
      this.authService.refreshToken().subscribe({
        complete:()=>{
          this.categoriService.PutCategory(formDate,this.id).subscribe({
            complete:()=>{
              this.isEdit=false
              this.ShowAllCategorise()
              this.CategoryForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`دسته بندی مورد نظر ویرایش شد`, '');
            }
          })
        }
      })
    }else{
      const formDate=new FormData()
      formDate.append('title',this.CategoryForm.value.title)
      formDate.append('href',this.CategoryForm.value.href)
      formDate.append('cover',this.cover)
      
      this.authService.refreshToken().subscribe({
        complete:()=>{
          this.categoriService.PostCreateCategory(formDate).subscribe({
            complete:()=>{
              this.ShowAllCategorise()
              this.CategoryForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`دسته بندی مورد نظر افزوده شد`, '');
            }
          })
        }
      })
    }
  }

  SelectItem(id:string,title:string,href:string){
    this.CategoryForm.get('title')?.setValue(title)
    this.CategoryForm.get('href')?.setValue(href)
    this.id=id
    this.isEdit=true
  }
removeUser(id:string,title:string){
  this.authService.refreshToken().subscribe({
    complete:()=>{
      this.adminService.openModal('حذف دسته بندی',title,()=>{
        this.categoriService.DeleteCategory(id).subscribe({
        complete:()=>{
          this.ShowAllCategorise()
          this.CategoryForm.reset()
          const toastr = this.injector.get(ToastrService);
          toastr.success(`دسته بندی مورد نظر حذف شد`, '');
        }
      })
      })
      
    }
  })
}

}
