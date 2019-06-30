import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../product.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  list: any;
  products = [];

  constructor(public cart: ProductService, user: UserService) {
    this.list = {};
    this.cart.getCart().then(x => {
      x.subscribe(dat => {
        if (dat == null) {
          console.log(null);
        } else {
          this.list = dat;
          this.products = [];
          for (let i = 0; i < this.list.length; i++) {
            this.cart.getProduct(this.list[i]).then(y => {
              y.subscribe(prod => {
                this.products.push(prod);
              });
            });
          }
          console.log(this.list);
          console.log(this.products);
        }
      });
    });
  }

  ngOnInit() {
  }

  removeFromCart(i) {
    this.products.splice(i, 1);
    this.list.splice(i, 1);
    console.log(this.list);
    console.log(this.products);
    this.cart.removeFromCart(i);
  }
}