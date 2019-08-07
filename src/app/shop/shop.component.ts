import { Component, OnInit } from '@angular/core';
import { ProductService } from "../product.service";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  displayProds = [];
  products;
  categories;
  low = 0;
  high = 16;

  constructor(private service: ProductService,
    private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.service.getProducts().subscribe(results => {
      this.products = results;
      if (results) {
        this.paginate(1);
      }
    });

    this.service.getCategories().subscribe(results => {
      this.categories = results;
    });
  }

  getProds(cat) {
    this.spinner.show();
    if (cat === 'All') {
      this.displayProds = this.products;
      this.spinner.hide();
    } else {
      this.displayProds = [];
      this.products.forEach(prod => {
        if (prod.category === cat) {
          this.displayProds.push(prod);
        }
        this.spinner.hide();
      });
    }
  }

  paginate(n) {
    this.spinner.show();
    let part;
    if (n === 1) {
      this.low = 0;
      this.high = 16;
      part = this.products.slice(0, 16);
    } else if (n === 2) {
      if (this.low <= 0) {
        return;
      } else if (this.low <= 16) {
        this.low = 0;
        this.high = 16;
        part = this.products.slice(0, 16);
      } else {
        this.low = this.low - 16;
        this.high = this.high - 16;
        part = this.products.slice(this.low, this.high);
      }
    } else if (n === 3) {
      if (this.high >= (this.products.length - 1)) {
        return;
      } else {
        this.low = this.low + 16;
        this.high = this.high + 16;
        part = this.products.slice(this.low, this.high);
      }
    } else {
      this.low = (this.products.length) - (this.products.length % 16);
      this.high = this.products.length;
      part = this.products.slice(this.low, this.high);
    }
    this.displayProds = part;
    this.spinner.hide();
  }

}
