import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoYourTeeComponent } from './do-your-tee/do-your-tee.component';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material';


@NgModule({
  declarations: [DoYourTeeComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild([{
      path: 'dyt',
      component: DoYourTeeComponent
    }]),
    MatCardModule
  ]
})
export class DesignModule { }
