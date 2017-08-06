import { Component, OnInit, Input } from '@angular/core';
import {   Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { AuthenticationService } from '../auth/auth.service';
import { IBucketlist } from './bucketlist.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'bucketlists',
    templateUrl: 'bucketlists.component.html',
    styleUrls: ['bucketlists.component.css'],
    providers: [ApiService] 
})

/*
* Bucketlist component that has the list of all the bucketlists
*/
export class BucketlistsComponent implements OnInit{
    newBucketlist: FormGroup;
    @Input() queryString: string;
    @Input() bucketlistsTitle: string = "Your bucketlists";
    bucketlists: IBucketlist[] = [];
    
    constructor(private api_service: ApiService, private formbuilder:FormBuilder, 
    private router: Router, private auth_service: AuthenticationService, private toastr: ToastsManager){}
    

    ngOnInit(): void{
        this.loadBucketlists();
        this.newBucketlist = this.formbuilder.group({
            bucketlistName: ['', [Validators.required, Validators.minLength(1)]],
        });
    }

    //create a new bucketlist
    createBucketlist(){
        if(this.auth_service.isAuthenticated()){
            if(this.newBucketlist.value.bucketlistName.length > 0){
                let body = JSON.stringify({name: this.newBucketlist.value.bucketlistName});
                this.api_service.createBucketlist(body).subscribe(data=> {this.loadBucketlists()});
                this.toastr.success('You are awesome!', 'Success!');
            }
        else {
            this.toastr.info('Be a good user, do the login.');
            this.router.navigate(['/auth/login']);
        }
        }
    }

    //get bucketlists and load them into the component
    loadBucketlists(): void{
        if(this.auth_service.isAuthenticated()){
            this.api_service.getBucketlists().subscribe(
                data => {
                    this.bucketlists = data;
                },
            );
        }
        else {
            this.toastr.info('Be a good user, do the login.');
            this.router.navigate(['/auth/login']);
        }
    }
}
