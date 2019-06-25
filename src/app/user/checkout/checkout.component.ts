import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {ProductService} from '../../product.service';

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

  constructor(public auth: UserService, public prod: ProductService) {
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
            this.prod.getProduct(this.cart[i]).then(y => {
              y.subscribe(pro => {
                this.products.push(pro);
                this.total += parseFloat(this.products[i].price);
              });
            });
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

}
