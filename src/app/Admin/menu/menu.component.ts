import { Component, Injector, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';
import { MenuService } from './menu.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";
import { Menu } from '../../Models/menu.model';
import { Observable } from 'rxjs';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmModalDeleteComponent, JalaliDateSimplePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuForm!: FormGroup
  isEdit: boolean = false
  menu!: Menu[]
  parent!: Menu[]
  menuID: string = ''
  constructor(private adminService: AdminService, private menuService: MenuService, private authService: AuthService, private injector: Injector) { }
  ngOnInit(): void {
    this.menuForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      href: new FormControl(null, [Validators.required]),
      parent: new FormControl(null, [Validators.required])
    })
    this.adminService.setTitle('منو ها')
    this.ShowAllMenu()
    this.ShowMenu()
  }
  ShowAllMenu() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.menuService.getShowAllMenus().subscribe({
          next: (res: Menu[]) => {
            // console.log(res);
            this.menu = res
          }
        })
      }
    })
  }
  ShowMenu() {
    this.menuService.ShowGetMenu().subscribe({
      next: (res: Menu[]) => {
        this.parent = res
      }
    })
  }
  parentId(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input) {
      // this.categoryID = input.value
      console.log(input.value);

    }
  }
  SendMenu() {
    if (this.isEdit) {
      const form: Menu = {
        title: this.menuForm.value.title,
        href: this.menuForm.value.href,
        parent: this.menuForm.value.parent ? this.menuForm.value.parent : undefined,

      }
      this.authService.refreshToken().subscribe({
        complete: () => {
          this.menuService.PutMenu(this.menuID, form).subscribe({
            complete: () => {
              this.ShowAllMenu()
              this.menuForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`منو مورد نظر ویرایش شد`, '');
              this.isEdit=false
            }
          })
        }
      })
    } else {
      const form: Menu = {
        title: this.menuForm.value.title,
        href: this.menuForm.value.href,
        parent: this.menuForm.value.parent ? this.menuForm.value.parent : undefined,

      }
      this.authService.refreshToken().subscribe({
        complete: () => {
          this.menuService.PostCreateMenu(form).subscribe({
            complete: () => {
              this.ShowAllMenu()
              this.menuForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`منو جدید افزوده شد`, '');
              this.ShowMenu()
            }
          })
        }
      })

    }
  }
  selectedItem(id: string, title: string, href: string) {
    this.menuForm.get('title')?.setValue(title)
    this.menuForm.get('href')?.setValue(href)
    this.menuID = id
    this.isEdit = true
  }
  Delete(id:string,title:string){
    this.authService.refreshToken().subscribe({
      complete:()=>{
        this.adminService.openModal('حذف منو',title,()=>{

          this.menuService.DeleteMenu(id).subscribe({
            complete:()=>{
              this.ShowAllMenu()
              this.menuForm.reset()
              const toastr = this.injector.get(ToastrService);
              toastr.success(`منو مورد نظر پاک شد`, '');
            }
          })
        })
      }
    })
  }
}
