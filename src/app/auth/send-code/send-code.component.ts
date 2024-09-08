import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './send-code.component.html',
  styleUrl: './send-code.component.css'
})
export class SendCodeComponent implements OnInit {
  emailForm!: FormGroup
 
constructor(private authServise:AuthService,private roter:Router){}

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      emailInput: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)])
    })
  }

  async unSubmit(){
    if (this.emailForm.valid) {
      const email = this.emailForm.get('emailInput')?.value;
      (await this.authServise.sendEmail(email)).subscribe({
        next: (response) => {
          console.log('ایمیل با موفقیت ارسال شد:', response);
        },
        complete:()=>{
          this.roter.navigate(['auth/verifi-email'])
        }
        ,
        error: (error) => {
          console.error('خطا در ارسال ایمیل:', error);
        }
      });
    } else {
      console.log('فرم معتبر نیست');
    }
  }
  
}
