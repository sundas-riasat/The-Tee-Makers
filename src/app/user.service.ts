import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users;

  constructor(private db: AngularFireDatabase) {
  }

  getUsers() {
  }

}
