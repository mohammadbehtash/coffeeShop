import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from '../../auth/auth.service';
import { Creator } from '../../Models/creator.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from '../../Models/userInfo.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { AdminService } from '../admin.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, JalaliDateSimplePipe, CommonModule, ConfirmModalDeleteComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users!: Creator[]
  
  userID: string = ''
  IAdmin!:string
  constructor(private authService: AuthService, private userService: UserService,
    private injector: Injector,private adminService:AdminService,private cdr: ChangeDetectorRef
  ) { }
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3)]),
    userName: new FormControl('', [Validators.required,Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)]),
    phone: new FormControl('', [Validators.required,Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)])
  })
  ngOnInit(): void {
    this.adminService.setTitle('کاربرها')
    this.ShowAlluser()

   
    // this.cdr.detectChanges();
  }
  ShowAlluser(){
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.userService.getShowAllusers().subscribe({
          next: (res: Creator[]) => {
            this.users = res
            this.showName()
          }
        })
      }
    })
  }

  EditUser(id: string, name: string, username: string, email: string, phone: string) {
    this.userForm.get('name')?.setValue(name)
    this.userForm.get('userName')?.setValue(username)
    this.userForm.get('email')?.setValue(email)
    this.userForm.get('phone')?.setValue(phone)
    this.userID = id
  }

  createUser() {
    console.log(this.userForm.value);
  }

editRoleUser(id:string){
  this.authService.refreshToken().subscribe({
    complete:()=>{

      this.userService.putEditRole(id).subscribe({
        complete:()=>{
          this.ShowAlluser()
        this.userForm.reset()
        }
      })
    }
  })
}
removeUser(id:string,name:string){
  this.authService.refreshToken().subscribe({
    complete:()=>{
      this.adminService.openModal('حذف کاربر',name,()=>{
         this.userService.Remove(id).subscribe({
        complete:()=>{
          this.ShowAlluser()
          const toastr = this.injector.get(ToastrService);
            toastr.success(`کاربر حذف شد`, '');
        }
      })
      })
     
    }
  })
}

updatedUser(){
  const userInfo: UserInfo = {
    name: this.userForm.value.name ?? '',
    username: this.userForm.value.userName ?? '',
    phone: this.userForm.value.phone ?? '',
    email: this.userForm.value.email ?? '',
    password: this.userForm.value.password ?? '',
    id: this.userID ?? ''
  };

  this.authService.refreshToken().subscribe({
    complete:()=>{
      this.userService.update(userInfo).subscribe({
        next:(res:UserInfo)=>{
          console.log(res);
        },complete:()=>{
          this.ShowAlluser()
          const toastr = this.injector.get(ToastrService);
          toastr.success(`اطلاعات کاربر بروز رسانی شد`, '');
        }
      })
    }
  })

}

showName() {
  
 this.authService.showUserNameInNav().subscribe({
    next: (res: Creator[]) => {
      this.IAdmin=res[0]._id
    },
    complete: () => {
    }, error: (err: any) => {
      console.log(err);
    }
  })
}

}
