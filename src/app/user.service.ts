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
      this.toastr.success('You have successfully logged into the system. Enjoy designing.' , 'Login Successful');
    } catch (e) {
      this.toastr.error(e.message, e.code);
      this.toastr.error('Couldnt login for unknown reasons. Check your internet connectivity and try again.', 'Login Failed');
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
    this.toastr.success('You have successfully logged out of the system. We hope to see you soon.' , 'Logout Successful');
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async signup(uname: string, email: string, password: string) {
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.user.updateProfile({displayName: uname});
      this.router.navigate(['/user/profile']);
      this.toastr.success('Please fill in your details and complete your profile.' , 'Signup Successful');
    } catch (e) {
      this.toastr.error('Couldnt sign up for unknown reasons. Check your internet connectivity and try again.', 'Signup Failed');
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
        this.toastr.success('Your data has been successfully saved.' , 'Data Saving Successful');
      }, err => {
        this.toastr.error('Couldnt save data for unknown reasons. Check your internet connectivity and try again.', 'Request Failed');
      });
    });
  }

  async getUserData(id) {
    return this.db.object('/usersData/' + id).valueChanges();
  }

  getUserId() {
    return this.uid ? this.uid : null;
  }

  async getUserOrder() {
    const id = JSON.parse(localStorage.getItem('user')).uid;
    return await this.db.list('/orders', ref => ref.orderByChild('uid')
      .equalTo(id)).valueChanges();
  }

  addMessage(msg) {
    return this.db.list('/messages/').push(msg);
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
