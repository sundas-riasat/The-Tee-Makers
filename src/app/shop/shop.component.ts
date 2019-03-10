import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  displayProds;
  products;
  categories;
  temp = {
    /* 3: {
       color: 'blue',
       category: 'TeeShirt',
       title: 'Blue Tee Shirt',
       maker: 'admin',
       date: '12-02-2019',
       price: '30',
       description: 'Teseert fdgfh gh gh',
       images: 'none',
       size: 'large'
     } */
  };

  constructor(private service: ProductService) {
  }

  ngOnInit() {
    this.service.getProducts().subscribe(results => {
      this.products = this.displayProds = results;
    });

    this.service.getCategories().subscribe(results => {
      this.categories = results;
    });
  }

  getProds(cat) {
    if (cat === 'All') {
      this.displayProds = this.products;
    } else {
      this.displayProds = [];
      this.products.forEach(prod => {
        if (prod.category === cat) {
          this.displayProds.push(prod);
        }
      });
    }

  }

}
