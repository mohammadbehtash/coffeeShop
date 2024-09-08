import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username:new FormControl(null,[Validators.required]),
      name:new FormControl(null,[Validators.required]),
      phone:new FormControl(null,[Validators.required]),
      password:new FormControl(null,[Validators.required])
    })
  }

  unSubmit(){  
      const register=this.registerForm.value
    console.log(register);
    
    this.authService.register(register).subscribe({
      next:(data:any)=>{
        console.log(data);
        
      },
      complete:()=>{
        this.router.navigate(['./'])
        
      }
    })
  }

}
