import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import {   Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    providers: [AuthenticationService, ApiService] 
})

export class LoginComponent implements OnInit{ 
    constructor(private auth_service: AuthenticationService, private router: Router, 
    private api_service: ApiService, private formbuilder:FormBuilder){}

    user: FormGroup;

    ngOnInit():void {
        this.user = this.formbuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    login() {
        console.log(this.user.value)
        let body = JSON.stringify({'email': this.user.value.username, 'password':this.user.value.password});
        let response = this.auth_service.login(body);
        response.subscribe(
            data => {
                if (this.auth_service.isAuthenticated()){
                    this.auth_service.email = this.user.value.username;
                    this.api_service.getBucketlists().subscribe(data=>console.log(data));
                    this.router.navigate(['/']);
                }
                },
            error => {console.log(error.json().message); return false;}
        );
        return false;
    }
}