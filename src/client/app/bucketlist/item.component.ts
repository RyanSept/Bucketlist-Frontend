import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IItems } from './items.interface';
import { AuthenticationService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    moduleId: module.id,
    selector: 'bucketlist-item',
    templateUrl: 'item.component.html',
     styleUrls: ['bucketlist-single.component.css'],
    providers: [ApiService] 
})

// Component for bucketlist item
export class ItemComponent implements OnChanges{
    id: number;
    @Input() item: IItems = <IItems>{};
    @Input() bucketlistID: number;
    itemName: string;
    itemDone: boolean;

    constructor(private api_service: ApiService, private router: Router,
    private auth_service: AuthenticationService, private toastr: ToastsManager,
    ){}

    ngOnChanges(): void{
        this.itemName = this.item.name;
        this.itemDone = this.item.done;
    }

     // save a  bucketlist item
    saveBucketlistItem(done: string = null){
        if(this.auth_service.isAuthenticated()){
            if(this.item.name!=this.itemName && this.itemName!=''){
                let body = JSON.stringify({name:this.itemName});
                this.api_service.updateBucketlistItem(this.item.id, this.bucketlistID, body).subscribe(
                    data=> this.toastr.success(data.message, "Success!")
                    );
            }
            else if(done==='true' || done==='false'){
                let body = JSON.stringify({done:done});
                this.api_service.updateBucketlistItem(this.item.id, this.bucketlistID, body).subscribe(data=> console.log(data));
                this.item.done = (done==='true');
            }
            this.item.date_modified = new Date().toUTCString();
        }
        else {
            this.toastr.info('Be a good user, do the login.');
            this.router.navigate(['/auth/login']);
        }
    }

    //delete a bucketlistItem
    deleteBucketlistItem() {
        this.api_service.deleteBucketlistItem(this.item.id, this.bucketlistID).subscribe(
            data=>{
                console.log(data);
                delete this.item;
            },
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