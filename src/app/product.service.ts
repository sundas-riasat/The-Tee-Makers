import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from './models/product';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: Product;
  cart: any;

  constructor(private db: AngularFireDatabase, public user: UserService) {
    this.db.object('usersData/' + this.user.getUserId() + '/cart').valueChanges().subscribe(y => {
      this.cart = y;
    });
  }

  getProducts() {
    return this.db.object('/products').valueChanges();
  }

  getCategories() {
    return this.db.object('/categories').valueChanges();
  }

  addProduct(temp) {
    this.db.object('/products').update(temp);
  }

  async getProduct(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  getSizes() {
    return this.db.object('/sizes').valueChanges();
  }

  addToCart(id) {
    this.cart.push(id);
    this.db.object('usersData/' + this.user.user.uid + '/cart').update(this.cart);
  }

  async getCart() {
      return this.db.object('usersData/' + this.user.getUserId() + '/cart').valueChanges();
  }
}
