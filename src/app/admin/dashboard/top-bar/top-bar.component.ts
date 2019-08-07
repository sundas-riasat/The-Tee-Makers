import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private admin: AdminService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.admin.logout().then(x => {
      this.toastr.success('You have been successfully logged out of the system.', 'Successful Logout');
      this.router.navigateByUrl('/');
    }).catch(err => {
      this.toastr.error('Couldnt log out of the system at the moment. Try again later', 'Error Logging out');
    });
  }
}
