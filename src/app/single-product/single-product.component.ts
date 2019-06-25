import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  id: number;
  product: any = {
    category: '',
    color: '#ffffff',
    date: new Date(),
    description: '',
    images: '',
    maker: '',
    price: 0,
    size: '',
    title: '',
  };
  sizes;

  constructor(private router: ActivatedRoute, private productService: ProductService) {
    router.params.subscribe(params => {
      this.id = params.id;
      productService.getProduct(this.id).then(x => {
        x.subscribe(prod => {
          this.product = new Product(prod);
        });
      });
      productService.getSizes().subscribe(colors => {
        this.sizes = colors;
      });
    });
  }

  addToCart() {
    this.productService.addToCart(this.id);
  }

  ngOnInit() {
  }

}
