import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private db: AngularFireDatabase, private router: Router) {
  }

  async login(uname, pass) {
    this.db.object('/admin/login').valueChanges().subscribe(x => {
      const cred: any = x;
      if (cred.uname === uname && cred.pass === pass) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        window.alert('Not Authorized For!!');
      }
    });
  }
}
