import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/auth.service';
import {   Router } from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
    providers: [AuthenticationService] 
})

export class RegisterComponent implements OnInit{
    constructor(private auth_service: AuthenticationService, private router: Router, private formbuilder:FormBuilder){}
    user: FormGroup;

    ngOnInit():void {
        this.user = this.formbuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, this.validateEmail]],
            passwords: this.formbuilder.group({
                password:['', Validators.required],
                confirm_password: ['', Validators.required],
            },{validator: this.validatePassword})
        });
    }

    register(){
        let body = JSON.stringify({
            'first_name': this.user.value.first_name,
            'last_name': this.user.value.last_name,
            'email': this.user.value.email,
            'password': this.user.value.passwords.password,
        });
        let response = this.auth_service.register(body);

        response.subscribe(
            data => {
                if(data.status == 201){
                    let body = JSON.stringify({'email': this.user.value.username, 'password':this.user.value.passwords.password});
                    this.auth_service.login(body);
                    this.router.navigate(['/']);
                }
            },
            error => {console.log(error.json().message)}
        );
    }

    validateEmail(email: FormControl) {
        let EmailRegEx = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return EmailRegEx.test(email.value) ? null : {emailInvalid: true};
    }

    validatePassword(passwords: FormGroup){
        return (passwords.value.password != '' || passwords.value.confirm_password != '') && 
        (passwords.value.password === passwords.value.confirm_password) ? null : {passwordInvalid: true}
    }
}