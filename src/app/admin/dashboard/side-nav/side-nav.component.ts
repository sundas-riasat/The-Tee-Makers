import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private admin: AdminService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.admin.logout().then(x => {
      this.toastr.success('You have been successfully logged out of the system.', 'Successful Logout');
      this.router.navigateByUrl('/');
    }).catch(err => {
      this.toastr.error('Couldnt log out of the system at the moment. Try again later', 'Error Logging out');
    });
  }

}
