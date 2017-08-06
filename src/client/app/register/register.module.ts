import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import {ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RegisterRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent]
})
export class RegisterModule { }