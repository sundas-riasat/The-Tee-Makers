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
  design: any;

  constructor(private db: AngularFireDatabase, public user: UserService) {
    if (localStorage.getItem('user') !== 'null') {
      this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').valueChanges().subscribe(y => {
        this.cart = y;
        localStorage.setItem('cart', JSON.stringify(this.cart));
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
    const check = JSON.parse(localStorage.getItem('cart')) !== null ? JSON.parse(localStorage.getItem('cart'))[0] : null;
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (check !== null) {
      this.cart.push(id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      this.cart = [];
      this.cart.push(id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    return this.db.list('usersData/' + JSON.parse(localStorage.getItem('user')).uid).set('cart', this.cart);
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
    return this.db.object('usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/cart').set(this.cart);
  }

  saveDesign(design) {
    this.design = design;
    this.db.list('/usersData/' + JSON.parse(localStorage.getItem('user')).uid + '/designs').push(design);
    this.addCustomDesignToCart(design);
  }

  addCustomDesignToCart(design) {
    let id = null;
    let subs = this.db.list('/products').valueChanges().subscribe(x => {
      id = x.length;
      this.db.list('/products').set((x.length).toString(), design);
      this.addToCart(design);
      subs.unsubscribe();
    });
  }

  getAllDesigns() {
    return this.db.list('/products');
  }
  getAllDesignsOfCurrentUser(){
    return this.db.list('/products', ref => ref.orderByChild('maker')
    .equalTo(this.user.getUserId())).valueChanges();
  }
  deleteDesign(prods) {
   return this.db.list('/').set('/products', prods);
  }
}
