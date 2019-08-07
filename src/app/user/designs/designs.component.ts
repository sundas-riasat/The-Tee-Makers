import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.css']
})
export class DesignsComponent implements OnInit {


  products: any;

  constructor(private prodService: ProductService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }


  ngOnInit() {
    this.spinner.show();
    this.prodService.getAllDesignsOfCurrentUser().subscribe(x => {
      console.log(x);
      this.products = x;
      this.spinner.hide();
    });
  }

  delete(i) {
    this.spinner.show();
    let newProds = [];
    newProds = this.products.filter((product, index) => {
      return index !== i;
    })
    this.prodService.deleteDesign(newProds).then(x => {
      this.spinner.hide();
      this.toastr.success('Your design has been removed from database.', 'Success');
    }).catch(x => {
      this.spinner.hide();
      this.toastr.success('Could not remove design from database. Check your internet connection and try again.', 'Error.');
    });
  }


}
