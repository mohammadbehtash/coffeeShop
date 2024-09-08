import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() lable:string=''
  @Input() type:string='text'
  @Input() placeholder:string=''
  @Input() control:FormControl=new FormControl()
}
