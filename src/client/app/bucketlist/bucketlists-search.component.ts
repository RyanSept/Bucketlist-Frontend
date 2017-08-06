import { Component } from '@angular/core';
import {   Router, ActivatedRoute } from '@angular/router';

@Component({
  moduleId: module.id,
  template: `<bucketlists [queryString]='this.queryString' [bucketlistsTitle]='this.queryTitle'></bucketlists>`,
})

// search component
export class BucketlistsSearchComponent {
    queryString: string = '';
    queryTitle: string = ''
    private sub: any;

    constructor(private route: ActivatedRoute){
        // capture query param in url for filtering bucketlists accordingly
        this.sub = this.route.queryParams.subscribe(
            params => {
                this.queryString = params['q'];
                this.queryTitle = "Bucketlists filtered by: " + this.queryString;
            }
        )
    }
 }