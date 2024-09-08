import { Component, Injector, OnInit } from '@angular/core';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { CountactService } from './countact.service';
import { CountactUs } from '../../Models/contact-us.model';
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-countact-us',
  standalone: true,
  imports: [ConfirmModalDeleteComponent, CommonModule, ReactiveFormsModule, JalaliDateSimplePipe],
  templateUrl: './countact-us.component.html',
  styleUrl: './countact-us.component.css'
})
export class CountactUsComponent implements OnInit {
  countacrForm!: FormGroup
  contact!: CountactUs[]
  contactCopy!: CountactUs[]
  disableadEmail: boolean = false;
  countactEmail: string = ''
  countactBody: string = ''
  countactUsNumber:number=0
  constructor(private adminService:AdminService,private authService: AuthService, private countactServoce: CountactService, private injector: Injector) { }

  ngOnInit(): void {
    this.adminService.setTitle('پیام ها')
    this.countacrForm = new FormGroup({
      answer: new FormControl(null, [Validators.required]),
    })
    this.ShowAllCountact_us()
  }

  ShowAllCountact_us() {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.countactServoce.GetShowAllCountact_us().subscribe({
          next: (data: CountactUs[]) => {
            console.log(data);
            this.contact = [...data]
            this.contactCopy=data
            this.countactUsNumber=this.contactCopy.filter(item=>item.answer===0).length
            this.countactServoce.updateCountentUs(this.countactUsNumber)
          }
        })
      }
    })
  }

  selected(body: string, email: string) {

    this.countactBody = body
    this.countactEmail=email
  }

  sendAnswer() {
    const answer: CountactUs = {
      email:this.countactEmail,
      answer: this.countacrForm.value.answer
    }
    // console.log(answer);
    
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.countactServoce.postAnswer(answer).subscribe({
          complete: () => {
            const toastr = this.injector.get(ToastrService);
              toastr.success(`جواب پیام ارسال شد`, '');
              this.countacrForm.reset()
              this.ShowAllCountact_us()
          }
        })
      }
    })
  }
}
