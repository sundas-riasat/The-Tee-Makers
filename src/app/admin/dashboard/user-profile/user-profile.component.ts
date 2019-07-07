import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  email;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  findUser(){
    this.adminService.findUser(this.email);
  }
}
