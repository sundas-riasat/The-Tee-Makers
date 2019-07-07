import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ProductService} from '../../../product.service';

@Component({
    selector: 'app-order-popup',
    templateUrl: './order-popup.component.html',
    styleUrls: ['./order-popup.component.css']
})
export class OrderPopupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<OrderPopupComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private prod: ProductService) {

    }

    ngOnInit() {
    }


    onNoClick(): void {
        this.dialogRef.close();
    }
}
