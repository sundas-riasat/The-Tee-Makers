import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {MatInputModule} from "@angular/material";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatInputModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      }
    ])
  ]
})
export class UserModule { }
