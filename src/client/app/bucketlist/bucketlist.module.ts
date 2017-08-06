import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BucketlistsComponent } from './bucketlists.component';
import { BucketlistSingleComponent } from './bucketlist-single.component';
import { ItemComponent } from './item.component';
import { BucketlistRoutingModule } from './bucketlist-routing.module';
import { BucketlistsSearchPipe } from './bucketlists-search.pipe';
import { BucketlistsSearchComponent } from './bucketlists-search.component';

@NgModule({
  imports: [CommonModule, SharedModule, BucketlistRoutingModule, ReactiveFormsModule],
  declarations: [
    BucketlistsComponent, BucketlistSingleComponent, ItemComponent, 
    BucketlistsSearchPipe, BucketlistsSearchComponent
    ],
  exports: [BucketlistsComponent, BucketlistSingleComponent]
})
export class BucketlistsModule { }