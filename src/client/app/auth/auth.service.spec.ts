import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { TestBed } from '@angular/core/testing';
import { ConnectionBackend, BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

export function main() {
    describe('AuthService', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    AuthenticationService,
                    MockBackend,
                    BaseRequestOptions,
                    JwtHelper,
                    {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                    }
                ],
                imports: [
                    HttpModule
                ]
                });
            
            
        });

        describe('login', () => {
            it('should get token on login', () => {
                let mockResponse = JSON.stringify({"access_token": "a-token"});
                let mockBackend = TestBed.get(MockBackend);
                let authService = TestBed.get(AuthenticationService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                authService.login(JSON.stringify({email:"test@gmail.com", password:"password"})).subscribe(
                    (data:any) => {expect(data.json().access_token).toEqual('a-token')}
                );
            });

            it('should register', () => {
                let mockResponse = JSON.stringify({"message": "Successfully registered the user with the email test@gmail.com."});
                let mockBackend = TestBed.get(MockBackend);
                let authService = TestBed.get(AuthenticationService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                authService.register(JSON.stringify({
                    first_name:"John", last_name:"Doe",
                    email:"test@gmail.com", password:"password"
                })).subscribe(
                    (data:any) => {expect(data.json().message).toContain("Success")}
                );
            });
        })
    })
}