import {Component} from '@angular/core';
import {UserService} from './user.service';
import {ProductService} from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'the-t-makers';

  constructor(user: UserService, prod: ProductService) {
    prod.getCart();
    console.log('Is User LoggedIn: ' + user.isLoggedIn());
    user.getUser().then(data => {
      data.subscribe(x => {
      });
    }).catch(error => {
      console.log(error);
    });
  }
}
