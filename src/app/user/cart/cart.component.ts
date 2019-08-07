import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { UserService } from '../../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any = [];
  disabled = true;

  constructor(public cart: ProductService, user: UserService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.spinner.show();
    this.cart.getCart().then(x => {
      x.subscribe(dat => {
        if (dat == null) {
          console.log(null);
          this.spinner.hide();
          this.disabled = true;
          this.toastr.error('No items found in your cart.', 'Error');
        } else {
          this.products = dat;
          this.spinner.hide();
          this.disabled = false;
        }
      });
    });
  }

  ngOnInit() {
  }

  removeFromCart(i) {
    this.spinner.show();
    this.products.splice(i, 1);
    console.log(this.products);
    this.cart.removeFromCart(i).then(x => {
      this.spinner.hide();
      this.toastr.success('Item has been successfully removed from cart.', 'Success');
    }).catch(err => {
      this.spinner.hide();
      this.toastr.error('Could not remove item from cart. Please check your internet connection and try again.', 'Error');
    });
  }
}
