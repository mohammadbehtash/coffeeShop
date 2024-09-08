import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      identifier: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })

  }



  unSubmit() {
    const login = this.loginForm.value
    this.authService.loginuser(login).subscribe({
      next: (user: any) => {
        console.log('user', user);

      },
      complete: () => {

        this.router.navigate(['./'])
      }
    })
    console.log(login);

  }
}
