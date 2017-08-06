import { Component, ViewContainerRef } from '@angular/core';
import { Config } from './shared/config/env.config';
import './operators';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(public toastr: ToastsManager, vRef:ViewContainerRef) {
    console.log('Environment config', Config);
    this.toastr.setRootViewContainerRef(vRef);
  }
}
