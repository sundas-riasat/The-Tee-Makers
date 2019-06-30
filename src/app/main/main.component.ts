import {Component, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  loggedIn: boolean;

  constructor(prod: ProductService, user: UserService, router: Router) {
    prod.getCart();
    this.loggedIn = user.isLoggedIn();
    user.getUser().then(data => {
      data.subscribe(x => {
      });
    }).catch(error => {
      console.log(error);
    });
    router.events.subscribe(x => {
      const str = x.toString();
      if (str.indexOf('admin') !== -1) {
        this.loggedIn = false;
      } else if (str.indexOf('NavigationEnd') !== -1) {
        if (str.indexOf('design') !== -1) {
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
      }
    });
  }

  ngOnInit() {
  }

}
