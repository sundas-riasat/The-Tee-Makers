import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService
  ) {

   }

  ngOnInit() {
    setTimeout(()=>{
      this.spinner.hide();
    }, 5000);
  }

}
