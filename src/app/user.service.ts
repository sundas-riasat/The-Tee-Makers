import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {User} from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  uid: any;
  constructor(public  afAuth: AngularFireAuth, public  router: Router, public db: AngularFireDatabase, private toastr: ToastrService) {
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
      this.toastr.error(e.message, e.code);
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
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
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

  async getUserOrder() {
    const id = JSON.parse(localStorage.getItem('user')).uid;
    return await this.db.list('/orders', ref => ref.orderByChild('uid')
      .equalTo(id)).valueChanges();
  }

  addMessage(msg) {
    this.db.list('/messages/').push(msg);
  }

  async getMessages() {
    const id = JSON.parse(localStorage.getItem('user')).uid;
    return await this.db.list('/messages', ref => ref.orderByChild('uid')
      .equalTo(id)).valueChanges();
  }

  loginWithGoogle(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then(() => {
      this.afAuth.auth.getRedirectResult().then(result => {
        this.toastr.success('You are now logged in with Google.', 'Login Successful' );
        console.log('auth result', result);
      }).catch(error => {
        this.toastr.error(error.message, 'Error Authenticating');
        console.log('auth error', error);
      });
    });
  }

  loginWithFacebook(){
    this.afAuth.auth.signInWithRedirect(new auth.FacebookAuthProvider()).then(() => {
      this.afAuth.auth.getRedirectResult().then(result => {
        this.toastr.success('You are now logged in with Facebook.', 'Login Successful' );
        console.log('auth result', result);
      }).catch(error => {
        this.toastr.error(error.message, 'Error Authenticating');
        console.log('auth error', error);
      });
    });
  }
}
