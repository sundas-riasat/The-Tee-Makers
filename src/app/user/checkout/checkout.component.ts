import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {ProductService} from '../../product.service';
import {Router} from '@angular/router';

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

  constructor(public auth: UserService, public prod: ProductService, public router: Router) {
    this.disabled = true;
    setTimeout(() => {
      this.id = auth.getUserId();
      this.auth.getUserData(this.id).then(x => {
        x.subscribe(data => {
          console.log(this.id);
          this.user = data;
          this.card = this.user.card;
          this.cart = this.user.cart;
          if (this.cart) {
            for (let i = 0; i < this.cart.length; i++) {
              this.prod.getProduct(this.cart[i]).then(y => {
                y.subscribe(pro => {
                  this.products.push(pro);
                  this.total += parseFloat(this.products[i].price);
                });
              });
            }
          } else {
            console.log('Cart is empty');
          }
        });
      });
    }, 3000);
  }


  ngOnInit() {
  }

  disable(val) {
    this.disabled = val;
  }

  checkout() {
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
    order.cart = this.cart;
    if (!this.disabled) {
      order.card = this.card;
      order.cash = false;
    } else {
      order.card = {};
    }
    this.prod.makeOrder(order).then(x => {
      console.log('Done Happily');
      this.router.navigate(['/shop']);
    }).catch(err => {
      console.log('Sad: ' + err);
    });
  }
}
