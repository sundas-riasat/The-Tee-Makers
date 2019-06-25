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
    setTimeout(() => {
      this.cart.getCart().then(x => {
        x.subscribe(dat => {
          this.list = dat;
          for (let i = 0; i < this.list.length; i++) {
            this.cart.getProduct(this.list[i]).then(y => {
              y.subscribe(prod => {
                this.products.push(prod);
              });
            });
          }
        });
      });
    }, 1000);
  }

  ngOnInit() {
  }

}
