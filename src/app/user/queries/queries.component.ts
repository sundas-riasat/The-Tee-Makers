import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  displayedColumns: string[] = ['sr', 'date', 'msg', 'fname', 'lname', 'phn', 'email', 'status'];
  transactions = [];

  constructor(public user: UserService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.user.getMessages().then(x => {
      x.subscribe(data => {
        this.transactions = data;
        this.spinner.hide();
      });
    }).catch(err => {
      this.spinner.hide();
    });
  }

  ngOnInit() {
  }

}
