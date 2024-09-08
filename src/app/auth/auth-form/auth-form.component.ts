import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RegisterComponent } from "../register/register.component";
import { SendCodeComponent } from "../send-code/send-code.component";
import { VerifyEmailComponent } from "../verify-email/verify-email.component";
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [LoginComponent, RegisterComponent, SendCodeComponent, VerifyEmailComponent,RouterModule,CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  active=false
}
