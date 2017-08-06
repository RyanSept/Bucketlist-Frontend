import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { IBucketlist } from './bucketlist.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from '../auth/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'bucketlist-single',
    templateUrl: 'bucketlist-single.component.html',
     styleUrls: ['bucketlist-single.component.css'],
    providers: [ApiService] 
})

/*
* This component provides a view for a single bucketlist.
*/

export class BucketlistSingleComponent implements OnInit, OnDestroy{
    id: number;
    bucketlist: IBucketlist = <IBucketlist>{};
    bucketlistName: string;
    newItem: FormGroup;
    private sub: any;

    constructor(private api_service: ApiService, private auth_service: AuthenticationService,
    private route: ActivatedRoute, private router: Router, private formbuilder: FormBuilder, private toastr: ToastsManager){}
    
    ngOnInit(): void{
        this.bucketlistName = '';

        //form for new item creation
        this.newItem = this.formbuilder.group({
            itemName: ['', [Validators.required, Validators.minLength(1)]],
        });
        // capture id param in url and get bucketlist with corresponding id
        this.sub = this.route.params.subscribe(
            params => {
                this.id = +params['id']; //convert to number
                if(!isNaN(this.id)){
                    this.loadBucketlist();
                }
                else{
                    this.toastr.info("The ID should be an integer.")
                }
            });
    }

    // create a bucketlist item
    createBucketlistItem(){
        if(this.newItem.valid){
            let body = JSON.stringify({
                name: this.newItem.value.itemName,
            });

            this.api_service.createBucketlistItem(this.id, body).subscribe(
                data => {
                    this.toastr.success(data.message);
                    this.loadBucketlist();
                },
                error => {
                    if(error.status === 401){
                        this.toastr.info('Be a good user, do the login.');
                        this.router.navigate(['/auth/login']);
                    }
                    else{
                        this.toastr.error(error.message, "Well this is embarassing...");
                    }
                }
            );
        }
    }
    //delete a bucketlist
    deleteBucketlist(){
        this.api_service.deleteBucketlist(this.id).subscribe(
            data => {
                this.toastr.success(data.message, "Awesome!");
                this.router.navigate(['/']);
            },
            error => {
                if(error.status === 401){
                    this.toastr.info('Be a good user, do the login.');
                    this.router.navigate(['/auth/login']);
                }
                else{
                    this.toastr.error(error.message, "Crabapples!");
                }
            }
            );
    }

    // save a bucketlist
    saveBucketlist(){
        if (this.bucketlistName != this.bucketlist.name && this.bucketlistName != ''){
            let body = JSON.stringify({
                name: this.bucketlistName,
            });
            this.api_service.updateBucketlist(this.id, body).subscribe(
                data => {console.log(data)},
                error => {
                    if(error.status === 401){
                        this.toastr.info('Be a good user, do the login.');
                        this.router.navigate(['/auth/login']);
                    }
                    else{
                        this.toastr.error(error.message, "Doh!");
                    }
                }
                );
        }
    }

    //get bucketlist and load it into the component
    loadBucketlist(): void{
        if(this.auth_service.isAuthenticated()){
            this.api_service.getBucketlistSingle(this.id).subscribe(data => {this.bucketlist = data;});
        }
        else {
            this.toastr.info('Be a good user, do the login.');
            this.router.navigate(['/auth/login']);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
  }
}