import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = {
    fname: '',
    lname: '',
    phno: '',
    email: '',
    msg: ''
  }

  constructor(public user: UserService) {
  }

  ngOnInit() {
  }

  save() {
    this.user.addMessage({
      uid: JSON.parse(localStorage.getItem('user')).uid,
      date: new Date().toLocaleString(),
      status: 'pending',
      message: this.message,
    });
  }
}
