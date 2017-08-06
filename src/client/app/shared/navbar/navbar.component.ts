import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
})

export class NavbarComponent { 
  queryString: string = '';
  userEmail: string = localStorage.getItem('userEmail');

  constructor(private router: Router, private auth_service: AuthenticationService, 
  private toastr: ToastsManager){}

  // called when user tries to search something
  search():void {
    // go to search page with user query as param
    if(this.queryString){
      this.router.navigate(['/search'], { queryParams: {q: this.queryString} })
    }
  }

  logout():void{
    if(this.auth_service.logout()){
      this.toastr.success('See you again soon!', 'Logged out');
    }
    this.router.navigate(['/']);
  }
}
