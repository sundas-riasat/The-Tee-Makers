import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: UserService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
  }

  ngOnInit() {
  }
  login(email, pass) {
    this.spinner.show();
    this.auth.login(email, pass).then(x=>{
      this.spinner.hide();
    })
  }
  signup(uname, email, pass) {
    this.spinner.show();
    this.auth.signup(uname, email, pass).then(x => {
      this.spinner.hide();
    });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook();
  }
}
