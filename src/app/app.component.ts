import {Component} from '@angular/core';
import {UserService} from './user.service';
import {ProductService} from './product.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-t-makers';
  showHeader = true;

  constructor(user: UserService, prod: ProductService, router: Router) {
    prod.getCart();
    console.log('Is User LoggedIn: ' + user.isLoggedIn());
    user.getUser().then(data => {
      data.subscribe(x => {
      });
    }).catch(error => {
      console.log(error);
    });
    router.events.subscribe(events => {
      const routeVal = events.toString();
      if (routeVal.indexOf('NavigationEnd') !== -1) {
        if (routeVal.indexOf('admin') !== -1 || routeVal.indexOf('design') !== -1) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }
}
