import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";

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
  temp = {
    /* 11: {
       color: 'blue',
       category: 'TeeShirt',
       title: 'Blue Tee Shirt',
       maker: 'admin',
       date: '12-02-2019',
       price: '30',
       description: 'Teseert fdgfh gh gh',
       images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
       size: 'large'
     },
    12: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    },
    13: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    },
    14: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    },
    15: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    },
    16: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    },
    17: {
      color: 'blue',
      category: 'TeeShirt',
      title: 'Blue Tee Shirt',
      maker: 'admin',
      date: '12-02-2019',
      price: '30',
      description: 'Teseert fdgfh gh gh',
      images: 'https://shop.hrc.org/pub/media/catalog/product/cache/698cf41f740175600da8a1889f1963b0/h/r/hrc11696cc_1.jpg',
      size: 'large'
    } */
  };

  constructor(private service: ProductService) {
  }

  ngOnInit() {
    this.service.addProduct(this.temp);
    this.service.getProducts().subscribe(results => {
      this.products = results;
      this.paginate(1);
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

  paginate(n) {
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
    console.log(this.low, this.high);
    this.displayProds = part;
  }

}
