import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(public db: AngularFireDatabase) {
    }

    getAllOrders() {
        return this.db.object('/orders').valueChanges();
    }

    updateStatus(id, val) {
        this.db.object('/orders/' + id + '/status').set(val);
    }
}
