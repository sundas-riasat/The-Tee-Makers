import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  tmp: any = {};
  card: any = {};
  disabled = true;

  constructor(public auth: UserService) {
    this.auth.getUser().then(data => {
      data.subscribe(x => {
        this.tmp.name = x ? x.displayName : null;
        this.tmp.email = x ? x.email : null;
        this.tmp.phone = x ? x.phoneNumber : null;
        this.tmp.dp = x ? x.photoURL : null;
        this.tmp.card = this.card;
        this.tmp.card.cardno = '';
        this.tmp.card.ccv = '';
        this.tmp.card.expiry = '';
        this.auth.getUserData(x.uid).then(y => {
          y.subscribe((dat) => {
            this.tmp = dat;
            this.card = this.tmp.card;
            console.log(dat);
          });
        }).catch(err => {
          console.log(err);
        });
      });
    }).catch(err => {
      console.log(err);
    });

  }

  save() {
    this.tmp.card = this.card;
    this.auth.saveUserData(this.tmp);
  }

  edit() {
    this.disabled = false;
  }

  ngOnInit() {
  }

}
