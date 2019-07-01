import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  uid: any;
  constructor(public  afAuth: AngularFireAuth, public  router: Router, public db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.uid = this.user.uid;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async signup(uname: string, email: string, password: string) {
    try {
      await this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password);
      this.user.updateProfile({displayName: uname});
      this.router.navigate(['/']);
    } catch (e) {
      alert('Error!' + e.message);
    }
  }

  async getUser() {
    return this.afAuth.user;
  }

  saveUserData(obj) {
    this.getUser().then(x => {
      x.subscribe(data => {
        this.db.object('/usersData/' + data.uid).update(obj);
        this.user.updateProfile({displayName: obj.name, photoURL: obj.dp});
        this.user.updateEmail(obj.email);
        window.alert('Profile Succesfully Updated');
      }, err => {
        window.alert('Error: ' + err);
      });
    });
  }

  async getUserData(id) {
    return this.db.object('/usersData/' + id).valueChanges();
  }

  getUserId() {
    return this.uid;
  }
}
