import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '../../../node_modules/@angular/router';
import { DashboardModule } from './dashboard/dashboard.module';

//components

import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      }
    ])
  ]
})
export class AdminModule { }
