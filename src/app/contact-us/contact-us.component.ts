import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactUsService } from './contact-us.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  contentForm!: FormGroup
  constructor(private contactUService:ContactUsService,private injector: Injector){}
  ngOnInit(): void {
    this.contentForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.pattern(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]),
      body: new FormControl(null, [Validators.required])
    })

  }

  sendContent() {
    const form=this.contentForm.value
    
    this.contactUService.postContact(form).subscribe({
      complete:()=>{
        const toastr = this.injector.get(ToastrService);
        toastr.success(`پیام شما به مدیر سایت ارسال شد`,'');
        this.contentForm.reset()
      }
    })

  }

}
