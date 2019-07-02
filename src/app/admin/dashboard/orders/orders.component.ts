import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material';
import {OrderPopupComponent} from '../order-popup/order-popup.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    orders: any = [];
    keys: any = [];

    constructor(private admin: AdminService, public dialog: MatDialog) {
        this.admin.getAllOrders().subscribe(x => {
            this.orders = [];
            this.keys = [];
            for (const k in x) {
                this.keys.push(k);
                this.orders.push(x[k]);
            }
        });
    }

    ngOnInit() {
    }

    openDialog(i): void {
        const dialogRef = this.dialog.open(OrderPopupComponent, {
            width: '800px',
            data: {id: this.keys[i], order: this.orders[i]}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    sentOut(i) {
        this.admin.updateStatus(this.keys[i], 'Sent Out');
    }

    done(i) {
        this.admin.updateStatus(this.keys[i], 'Delivered');
    }

    canceled(i) {
        this.admin.updateStatus(this.keys[i], 'Cancelled');
    }
}
