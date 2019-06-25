import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;

  constructor(public user: UserService) {
    this.isLoggedIn = user.isLoggedIn();
    this.user.getUser().then(data => {
      data.subscribe(x => {
        this.username = x ? x.displayName : null;
      });
    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit() {
  }

}
