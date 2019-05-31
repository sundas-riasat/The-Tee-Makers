import {Component, OnInit} from '@angular/core';
import * as Jimp from 'jimp';
import * as fs from 'file-system/file-system';

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
    Jimp.read('../../../assets/images/Group%201.png').then(shirt => {
      console.log(shirt);
      shirt.getBase64(shirt.getMIME(), (err, data) => {
        console.log(data);
        console.log(err);
        const base64Data = data.replace(/^data:image\/png;base64,/, '');
        fs.writeFile('test.png', base64Data, 'base64', (err) => {
          if (err) {
            return console.log(err);
          }
        });
      });
      // shirt.write('../../../assets/images/shirt.png');
      // return shirt
      //   .resize(256, 256) // resize
      //   .quality(60) // set JPEG quality
      //   .greyscale() // set greyscale
      //   .write('lena-small-bw.jpg');
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
