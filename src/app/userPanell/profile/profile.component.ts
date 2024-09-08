import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { ProfileService } from './profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup
  passwordForm!: FormGroup

  constructor(private authSercive: AuthService, private profileService: ProfileService, private injector: Injector) { }
  toastr = this.injector.get(ToastrService);
  // static passwordMatchValidator(): ValidatorFn {
  //   return (form: AbstractControl): ValidationErrors | null => {
  //     const formGroup = form as FormGroup;
  //     const password = formGroup.get('password')?.value;
  //     const confirmPassword = formGroup.get('confirmPassword')?.value;

  //     if (password && confirmPassword && password !== confirmPassword) {
  //       return { 'mismatch': true };
  //     }

  //     return null;
  //   };
  // }

  
  ngOnInit(): void {
    this.userForm = new FormGroup({
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
    })
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      newpassword: new FormControl(null, [Validators.required]),
    })
  }

  updatedUserinfo() {
    
    this.authSercive.refreshToken().subscribe({
      complete: () => {
        this.profileService.updeteUsertInfos(this.userForm.value).subscribe({
          complete: () => {
            this.toastr.success(`اطلاعات شما با موفقیت تغییر یافت`, '');
          }
        })
      }
    })
  }

  updatedPassword(){
    
    this.authSercive.refreshToken().subscribe({
      complete:()=>{
        this.profileService.updeteUsertPassword(this.passwordForm.value).subscribe({
          complete:()=>{
            this.toastr.success(`کلمه عبور شما با موفقیت تغییر یافت`, '');
          }
        })
      }
    })
  }


}
