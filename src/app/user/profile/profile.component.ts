import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../models/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  tmp: any = {
    name: '',
    email: '',
    phone: '',
    dp: '',
    card: {
      cardno: '',
      ccv: '',
      expiry: ''
    }
  };
  card: any = {
    cardno: '',
    ccv: '',
    expiry: ''
  };
  disabled = true;

  constructor(public auth: UserService, private spinner : NgxSpinnerService, private toastr: ToastrService) {
    this.spinner.show();
    this.auth.getUser().then(data => {
      data.subscribe(x => {
        this.tmp.name = x ? x.displayName : '';
        this.tmp.email = x ? x.email : '';
        this.tmp.phone = x ? x.phoneNumber : '';
        this.tmp.dp = x ? x.photoURL : '';
        this.auth.getUserData(x.uid).then(y => {
          y.subscribe((dat) => {
            this.tmp = dat;
            this.card = this.tmp.card ? this.tmp.card : this.card;
            this.spinner.hide();
          });
        }).catch(err => {
          this.spinner.hide();
        });
      });
    }).catch(err => {
      console.log(err);
      this.spinner.hide();
    });

  }

  save() {
    this.tmp.card = this.card;
    this.auth.saveUserData(this.tmp);
  }

  edit() {
    this.disabled = false;
    this.toastr.success('Now you can edit your profile.', 'Editing Enabled');
  }

  ngOnInit() {
  }

}
