import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BucketlistsComponent } from './bucketlists.component';
import { BucketlistSingleComponent } from './bucketlist-single.component';
import { BucketlistsSearchComponent } from './bucketlists-search.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'bucketlists/:id', component: BucketlistSingleComponent },
      { path: 'search', component: BucketlistsSearchComponent }
    ])
  ],
  exports: [RouterModule]
})
export class BucketlistRoutingModule { }
