import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  displayedColumns: string[] = ['sr', 'date', 'msg', 'fname', 'lname', 'phn', 'email', 'status'];
  transactions = [];

  constructor(public user: UserService) {
    this.user.getMessages().then(x => {
      x.subscribe(data => {
        console.log(data);
        this.transactions = data;
      });
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
