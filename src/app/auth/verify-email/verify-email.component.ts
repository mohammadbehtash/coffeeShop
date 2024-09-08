import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent implements OnInit{
  verifiForm!: FormGroup
 
constructor(private authServise:AuthService,private roter:Router){}

  ngOnInit(): void {
    this.verifiForm = new FormGroup({
      verificationCode: new FormControl(null, [Validators.required])
    })
  }

  async unSubmit(){
    if (this.verifiForm.valid) {
      const code = this.verifiForm.get('verificationCode')?.value;
      (await this.authServise.verifiEmail(code)).subscribe({
        next: (response) => {
          console.log('ایمیل با موفقیت تایید شد:', response);
        },
        complete:()=>{
          this.roter.navigate(['auth/register'])
        }
        ,
        error: (error) => {
          console.error('خطا در ارسال کد:', error);
        }
      });
    } else {
      console.log('فرم معتبر نیست');
    }
  }
}
