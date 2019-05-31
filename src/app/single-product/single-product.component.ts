import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from '../models/product';
import {ProductService} from "../product.service";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  id: number;
  product: Product;
  sizes;

  constructor(private router: ActivatedRoute, private productService: ProductService) {
    router.queryParams.subscribe(params => {
      this.id = params.id;
      productService.getProduct(this.id).subscribe(prod => {
        this.product = new Product(prod);
      });
      productService.getSizes().subscribe(colors => {
        this.sizes = colors;
      });
    });
  }

  ngOnInit() {
  }

}
