import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ConstantPool } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DesignApiService {

  brain: any;
  vec = 0;
  clr = 0;
  txt = 0;
  constructor(private http: HttpClient, private toastr: ToastrService) {

  }
  messageSet = {
    simple: [
      'Do you not think its too simple? Maybe add some stuff into it?',
      'Neh, too simple for you. You should try some colors.',
      'What is up with you bro? Why so simple?',
      'Add some stuff up. Looks like youre designing a shirt for your grandma.',
      'Life is pretty boring already. Dont make it more boring with a boring shirt.',
    ],
    normal: [
      'Well, that looks good. It would really suit you. Buy it right now.',
      'Woho! Somebody is gonna look too good to be true.',
      'That is a very nice color and a very elegant design. You should really go for it.',
      'For a casual outing, this would fit just anyone. Go get it.',
      'This shirt you just designed is the ultimate personality maker. You go dude!'
    ],
    clumsy: [
      'What in hell makes you think thats wearable? Too much stuff dude, too much stuff',
      'Slow down a little bit honey, that might not look appropriate. Think again.',
      'I dont think you wanna look good.',
      'Try using your sense of design. Maybe that would help you a little bit.',
      'Well, I personally think you can do better.'
    ],
  }
  url = 'https://intense-crag-68490.herokuapp.com/';
  // url = 'http://localhost:5000';
  get = 'GET';
  post = 'POST';
  src = "../../../assets/server/raw/img.png";
  price = 7;
  states = [];

  color(clr) {

    this.http.post(this.url + '/color', { current: this.src, color: clr, imgRaw: 'true' }).subscribe((data) => {
      const dat: any = data;
      this.src = dat.response;
      this.states.push(this.src);
      this.clr = 1;
      this.txt = 0;
      this.vec = 0;
      this.executeBrain();
      if (this.clr !== 1) {
        this.price += 2;
      }

    },
      err => {
        console.log(err);
      });
  }

  mask(i) {
    this.http.post(this.url + '/mask', { current: this.src, imgRaw: 'false', imgToMask: i }).subscribe((data) => {
      const dat: any = data;
      this.src = dat.response;
      this.states.push(this.src);
      this.vec = 1;
      this.executeBrain();
      if (this.vec !== 1) {
        this.price += 5;
      }
    },
      err => {
        console.log(err);
      });
  }

  customUpload(file) {
    console.log(typeof (file));
    console.log(typeof (this.src));
    this.http.post(this.url + '/customMask', { fd: file, current: this.src })
      .subscribe((data) => {
        const dat: any = data;
        this.src = dat.response;
        this.states.push(this.src);
        this.vec = 1;
        this.executeBrain();
        if (this.vec !== 1) {
          this.price += 5;
        }
      },
        err => {
          console.log(err);
        });
  }

  setType(t) {
    this.http.request('GET', this.url + '/type', { params: { type: t } }).subscribe((data) => {
      const dat: any = data;
      this.src = dat.response;
      this.states.push(this.src);
    },
      err => {
        console.log(err);
      });
  }

  setText(msg, fnt, size = 32, color, placement) {
    let newfont = fnt + '-' + size + '-' + color + '.fnt';
    this.http.post(this.url + '/text', { current: this.src, message: msg, font: newfont, place: placement })
      .subscribe((data) => {
        const dat: any = data;
        this.src = dat.response;
        this.states.push(this.src);
        this.txt = 1;
        this.executeBrain();
        if (this.txt !== 1) {
          this.price += 3;
        }
      },
        err => {
          console.log(err);
        });
  }
  initialize() {
    this.http.request('GET', this.url + '/raw').subscribe((data) => {
      const dat: any = data;
      this.src = dat.response;
      this.states.push(this.src);
      this.toastr.show('I am your personal assistant through the journey of designing a perfect shirt for you.', 'Hi! I am Sundas.');
    },
      err => {
        console.log(err);
      });
  }

  executeBrain() {
    this.http.request('GET', this.url + '/brain',
      { params: { color: this.clr.toString(), text: this.txt.toString(), vector: this.vec.toString() } })
      .subscribe((data) => {
        const dat: any = data;
        console.log(dat);
        const output = dat.brainOutput;
        let msg = '';
        if (output.simple > 0.5) {
          msg = this.messageSet.simple[Math.floor(Math.random() * 4)];
          this.toastr.show(msg, 'Sundas:');
        } else if (output.clumsy > 0.5) {
          msg = this.messageSet.clumsy[Math.floor(Math.random() * 4)];
          this.toastr.show(msg, 'Sundas:');
        } else if (output.normal > 0.5) {
          msg = this.messageSet.normal[Math.floor(Math.random() * 4)];
          this.toastr.show(msg, 'Sundas:');
        }
      },
        err => {
          console.log(err);
        });
  }

  getPrice() {
    return this.price;
  }

  undo() {
    if (this.states.length <= 1) {
      this.toastr.warning('You are already on initial state', 'Already Initial State');
    }
    else {
      this.states.pop();
      this.src = this.states[this.states.length - 1] ? this.states[this.states.length - 1] : "../../../assets/server/raw/img.png";
    }
  }
}
