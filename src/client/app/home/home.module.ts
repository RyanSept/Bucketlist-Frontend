import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BucketlistsModule } from  '../bucketlist/bucketlist.module';
import { AuthenticationService } from '../auth/auth.service';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule, BucketlistsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  providers: [AuthenticationService]
})
export class HomeModule { }
