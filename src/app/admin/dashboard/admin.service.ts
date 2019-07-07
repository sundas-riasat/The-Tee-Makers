import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public db: AngularFireDatabase, public auth: AngularFireAuth) {
  }

  getAllOrders() {
    return this.db.object('/orders').valueChanges();
  }

  updateStatus(id, val) {
    this.db.object('/orders/' + id + '/status').set(val);
  }
  updateMessageStatus(id, val) {
   return this.db.object('/messages/' + id + '/status').set(val);
  }
  findUser(key) {
    return true;
  }

  getMessages() {
    return this.db.object('/messages').valueChanges();
  }

  getTotals(key) {
    return this.db.list('orders', ref => ref.orderByChild('status').equalTo(key) ).valueChanges();
  }
  login(email, pass){
   return this.auth.auth.createUserWithEmailAndPassword(email, pass);
  }
}
