import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {OrdersComponent} from './orders/orders.component';
import {DesignsComponent} from './designs/designs.component';
import {QueriesComponent} from './queries/queries.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {CartComponent} from './cart/cart.component';
import {ProductService} from '../product.service';
import {UserService} from '../user.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxSpinnerModule } from "ngx-spinner";


@NgModule({
  declarations: [LoginComponent, ProfileComponent, OrdersComponent, DesignsComponent, QueriesComponent, CartComponent, CheckoutComponent],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'designs',
        component: DesignsComponent
      },
      {
        path: 'queries',
        component: QueriesComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      }
    ])
  ],
  providers: [
    ProductService,
    UserService
  ],
})
export class UserModule {
}
