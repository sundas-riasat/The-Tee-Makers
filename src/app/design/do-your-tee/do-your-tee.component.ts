import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-do-your-tee',
  templateUrl: './do-your-tee.component.html',
  styleUrls: ['./do-your-tee.component.css']
})
export class DoYourTeeComponent implements OnInit {
  opened = '';

  constructor() {
  }

  ngOnInit() {
  }

  openUp(id) {
    if (this.opened !== id) {
      document.getElementById(id).style.opacity = '1';
      this.opened = id;
    } else {
      document.getElementById(id).style.opacity = '0';
      this.opened = '';
    }
  }
}
