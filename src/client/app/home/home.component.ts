import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
  constructor(private auth_service:AuthenticationService) {}
}
