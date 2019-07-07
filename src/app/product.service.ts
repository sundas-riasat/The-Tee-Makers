import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Product } from './models/product';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: Product;
  cart: any = [];

  constructor(private db: AngularFireDatabase, public user: UserService) {
    if (localStorage.getItem('user') !== 'null') {
      this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').valueChanges().subscribe(y => {
        this.cart = y;
        localStorage.setItem('cart', this.cart);
      });
    }
  }

  getProducts() {
    return this.db.object('/products').valueChanges();
  }

  getCategories() {
    return this.db.object('/categories').valueChanges();
  }

  addProduct(temp) {
    this.db.list('/products').push(temp);
  }

  async getProduct(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  getSizes() {
    return this.db.object('/sizes').valueChanges();
  }

  addToCart(id) {
    const check = JSON.parse('[' + localStorage.getItem('cart') + ']')[0];
    this.cart = JSON.parse('[' + localStorage.getItem('cart') + ']');
    if (check !== null) {
      console.log(this.cart);
      this.cart.push(id);
      localStorage.setItem('cart', this.cart);
    } else {
      this.cart = [];
      this.cart.push(id);
      localStorage.setItem('cart', this.cart);
      console.log(this.cart);
    }
    this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').update(this.cart);
  }

  async getCart() {
    return this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').valueChanges();
  }

  async makeOrder(order) {
    this.cart = [];
    localStorage.setItem('cart', '');
    this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart')
      .remove().then(x => {
        console.log(x);
      }).catch(err => {
        console.log(err);
      });
    return this.db.list('/orders/').push(order);
  }

  async removeFromCart(i) {
    this.cart.splice(i, 1);
    console.log('IN service:' + this.cart);
    localStorage.setItem('cart', this.cart);
    this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').set(this.cart);
  }
}
