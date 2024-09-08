import { Component, OnInit } from '@angular/core';
import { InfoService } from './info.service';
import { ConfirmModalDeleteComponent } from "../confirm-modal-delete/confirm-modal-delete.component";
import { JalaliDateSimplePipe } from "../../jalali-date-simple.pipe";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Info } from '../../Models/info.model';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [ConfirmModalDeleteComponent, JalaliDateSimplePipe, ReactiveFormsModule, CommonModule],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent implements OnInit {
  infoForm!: FormGroup
  info!: Info
  infoId: string = ''
  logo!: File

  constructor(private adminService:AdminService,private infoService: InfoService, private authService: AuthService) { }

  ngOnInit(): void {
    this.adminService.setTitle('جزئیات سایت')
    this.ShowInfo()
    this.infoForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      logo: new FormControl(null, [Validators.required])
    })
  }

  ShowInfo() {
    this.infoService.ShowInfo().subscribe({
      next: (data: Info) => {
       
        this.info = data
      }
    })
  }

  removeInfo(id: string) {
    this.authService.refreshToken().subscribe({
      complete: () => {
        this.infoService.DeleteInfo(id).subscribe({
          complete: () => {
            this.ShowInfo()

          }
        })
      }
    })
  }

  // selectid(id: string, phone: string, email: string) {
  //   this.infoForm.get('email')?.setValue(email)
  //   this.infoForm.get('phone')?.setValue(phone)
  //   this.infoId = id
  

  // }


  adressCover(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logo = input.files[0];
    }
  }

  CreateInfo() {


    const formData = new FormData()
    formData.append('phone', this.infoForm.value.phone)
    formData.append('email', this.infoForm.value.email)
    formData.append('logo', this.logo)

    this.authService.refreshToken().subscribe({
      complete: () => {
        this.infoService.PostCreatedInfo(formData).subscribe({
          complete: () => {
            this.infoForm.reset()
            this.ShowInfo()
          }
        })
      }
    })
  }



}
