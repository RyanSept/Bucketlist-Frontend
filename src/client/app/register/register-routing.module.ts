import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'auth/register', component: RegisterComponent }
    ])
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }