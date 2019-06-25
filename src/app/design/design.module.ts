import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoYourTeeComponent } from './do-your-tee/do-your-tee.component';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [DoYourTeeComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild([{
      path: 'dyt',
      component: DoYourTeeComponent
    }]),
    MatCardModule,
    HttpClientModule
  ]
})
export class DesignModule { }
