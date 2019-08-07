import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MessagePopupComponent } from '../message-popup/message-popup.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: any = [];
  keys: any = [];
  constructor(private adminService: AdminService, private toastr: ToastrService, public dialog: MatDialog, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.adminService.getMessages().subscribe(x => {
      this.messages = [];
      this.keys = [];
      Object.keys(x).forEach(e => {
        this.messages.push(x[e]);
        this.keys.push(e);
        this.spinner.hide();
      });
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.code);
    });
  }

  ngOnInit() {

  }
  openDialog(i): void {
    const dialogRef = this.dialog.open(MessagePopupComponent, {
      width: '800px',
      data: { id: this.keys[i], message: this.messages[i] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  replied(i) {
    this.adminService.updateMessageStatus(this.keys[i], 'Replied').then(x => {
      this.toastr.success('Message status was successfully changed.', 'Status Change Successful');
    }).catch(e => {
      this.toastr.error(e.message, e.code);
    });
  }

  resolved(i) {
    this.adminService.updateMessageStatus(this.keys[i], 'Resolved').then(x => {
      this.toastr.success('Message status was successfully changed.', 'Status Change Successful');
    }).catch(e => {
      this.toastr.error(e.message, e.code);
    });
  }

  ignored(i) {
    this.adminService.updateMessageStatus(this.keys[i], 'Ignored').then(x => {
      this.toastr.success('Message status was successfully changed.', 'Status Change Successful');
    }).catch(e => {
      this.toastr.error(e.message, e.code);
    });

  }
}
