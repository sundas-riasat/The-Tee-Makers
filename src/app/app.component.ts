import {Component} from '@angular/core';
import {UserService} from './user.service';
import {ProductService} from './product.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-t-makers';


  constructor(user: UserService, prod: ProductService, route: ActivatedRoute, router: Router) {

  }
}
