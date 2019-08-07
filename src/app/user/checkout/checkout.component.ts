import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  disabled: boolean;
  id = '';
  user: any = {};
  card: any = {};
  cart: any = {};
  products: any = [];
  total = 0;

  constructor(public auth: UserService, public prod: ProductService, public router: Router,
    private toastr: ToastrService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.disabled = true;
    setTimeout(() => {
      this.id = auth.getUserId();
      this.auth.getUserData(this.id).then(x => {
        x.subscribe(data => {
          console.log(this.id);
          this.user = data;
          this.card = this.user.card;
          this.cart = this.user.cart;
          for (let i = 0; i < this.cart.length; i++) {
            this.products.push(this.cart[i]);
            this.total += parseFloat(this.cart[i].price);
            this.spinner.hide();
          }
        });
      });
    }, 1000);
  }


  ngOnInit() {
  }

  disable(val) {
    this.disabled = val;
  }

  checkout() {
    this.spinner.show();
    const order: any = {};
    order.uid = this.id;
    order.name = this.user.name;
    order.date = new Date().toLocaleString();
    order.status = 'pending';
    order.total = this.total;
    order.address = {
      country: this.user.country,
      stAdd: this.user.address,
      zip: this.user.zip,
      city: this.user.city
    };
    order.detail = this.cart.length + 'Tee Shirts';
    order.cart = this.cart;
    if (!this.disabled) {
      order.card = this.card;
      order.cash = false;
    } else {
      order.card = {};
    }
    this.prod.makeOrder(order).then(x => {
      console.log('Done Happily');
      this.spinner.hide();
      this.toastr.success('Your order has successfully been created.', 'Success');
      this.router.navigate(['/shop']);
    }).catch(err => {
      this.toastr.error('Could not make order. Please check your internet connection and try again.', 'Error');
    });
  }
}
