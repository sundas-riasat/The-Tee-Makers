import {Component, OnInit} from '@angular/core';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['sr', 'date', 'details', 'price', 'status', 'exp'];
  transactions = [];

  /** Gets the total cost of all transactions. */
  constructor(user: UserService) {
    const orders = user.getUserOrder().then(x => {
      x.subscribe(data => {
        this.transactions = data;
      });
    });
  }

  ngOnInit() {
  }

  getExpectedDate(date) {
    const result = new Date(date);
    result.setDate(result.getDate() + 6);
    return result.toLocaleString();
  }

}
