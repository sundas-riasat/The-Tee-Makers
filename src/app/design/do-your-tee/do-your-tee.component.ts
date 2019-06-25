import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-do-your-tee',
  templateUrl: './do-your-tee.component.html',
  styleUrls: ['./do-your-tee.component.css']
})
export class DoYourTeeComponent implements OnInit {
  opened = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.request('GET', 'http://localhost:3000').subscribe((data) => {
        const dat: any = data;
        console.log(dat.path);
        document.getElementById('shirt').setAttribute('src', '../../../../../../' + dat.path);
      },
      err => {
        console.log(err);
      });
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
