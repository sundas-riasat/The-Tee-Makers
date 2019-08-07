import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: ActivatedRoute, private productService: ProductService, private spinner: NgxSpinnerService, private toastr: ToastrService) {
    this.spinner.show();
    router.params.subscribe(params => {
      this.id = params.id;
      productService.getProduct(this.id).then(x => {
        x.subscribe(prod => {
          this.product = new Product(prod);
          this.spinner.hide();
        });
      });
      productService.getSizes().subscribe(colors => {
        this.sizes = colors;
        this.spinner.hide();
      });
    });
  }

  addToCart(prod) {
    this.spinner.show()
    this.productService.addToCart(prod).then(x => {
      this.spinner.hide();
      this.toastr.success('Item successfully added to cart.', 'Success');
    }).catch(err => {
      this.spinner.hide();
      this.toastr.error('Could not add item to the cart. Unknown reasons', 'Error');
    })
  }

  customize(){

  }

  ngOnInit() {
  }

}
