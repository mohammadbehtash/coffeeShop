import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [FormComponent,InputComponent],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  exports:[FormComponent,InputComponent]
})
export class SharedModule { }
