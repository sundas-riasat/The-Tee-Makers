import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) {
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

  getProduct(id) {
    return this.db.object('/products/' + id).valueChanges();
  }

  getSizes(){
    return this.db.object('/sizes').valueChanges();
  }
}
