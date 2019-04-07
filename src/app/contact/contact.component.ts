import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message = {
    fname:'',
    lname:'',
    phno:'',
    email:'',
    msg:''
    }
  constructor() { }

  ngOnInit() {
  }

  save(){
    console.log(this.message);
  }
}
