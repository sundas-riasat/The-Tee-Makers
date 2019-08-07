import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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

  constructor(public user: UserService,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService) {
  }

  ngOnInit() {
  }

  save() {
    this.spinner.show();
    this.user.addMessage({
      uid: JSON.parse(localStorage.getItem('user')).uid,
      date: new Date().toLocaleString(),
      status: 'pending',
      message: this.message,
    }).then(x => {
      this.spinner.hide();
      this.toastr.success('Your message has been successfully sent to the team. We will soon reach out to you.', 'Message Sent');
    }).catch((err) => {
      this.spinner.hide();
      this.toastr.success('Your message couldnt be sent because of unknown circumstances.', 'Message Sending failed.');
    })
  }
}
