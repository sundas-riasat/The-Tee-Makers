import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: any = [];

  constructor(public cart: ProductService, user: UserService) {
    this.cart.getCart().then(x => {
      x.subscribe(dat => {
        if (dat == null) {
          console.log(null);
        } else {
          this.products = dat;
          console.log(this.products);
        }
      });
    });
  }

  ngOnInit() {
  }

  removeFromCart(i) {
    this.products.splice(i, 1);
    console.log(this.products);
    this.cart.removeFromCart(i);
  }
}
