import { ApiService } from './api.service';
import { AuthenticationService } from '../auth/auth.service';
import { Observable } from 'rxjs/Rx';
import { TestBed, async } from '@angular/core/testing';
import { ConnectionBackend, BaseRequestOptions, Http, HttpModule, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestFixtures } from '../shared/bucketlists.fixture';
import { IBucketlist } from '../bucketlist/bucketlist.interface';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';

export function main() {
    describe('ApiService', () => {

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    ApiService,
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

        it('should get bucketlists',() => {
            let mockBucketlists = JSON.stringify(new TestFixtures().testBucketlists);
            let mockBackend = TestBed.get(MockBackend);
            let apiService = TestBed.get(ApiService);

            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({ body: mockBucketlists })));
            });

            apiService.getBucketlists().subscribe(
                (data:any) => {expect(data[0].name).toEqual("A bucketlist")}
            );
        });

        it("should get a single bucketlist", () => {
            let mockBucketlist = JSON.stringify(new TestFixtures().testBucketlist);
            let mockBackend = TestBed.get(MockBackend);
            let apiService = TestBed.get(ApiService);

            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({ body: mockBucketlist })));
            });

            apiService.getBucketlistSingle(1).subscribe(
                (data:any) => {expect(data.name).toEqual("A bucketlist")}
            );
        });

        it('should create a bucketlist', () => {
                let mockResponse = JSON.stringify({message: "Bucketlist successfully created!"});
                let mockBackend = TestBed.get(MockBackend);
                let apiService = TestBed.get(ApiService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                apiService.createBucketlist(JSON.stringify({name:"New bucketlist"})).subscribe(
                    (data:any) => {expect(data.message).toEqual("Bucketlist successfully created!")}
                );
            });
        
        it('should update an existing bucketlist', () => {
                let mockResponse = JSON.stringify({message: "Bucketlist 1 successfully updated!"});
                let mockBackend = TestBed.get(MockBackend);
                let apiService = TestBed.get(ApiService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                apiService.updateBucketlist(1, JSON.stringify({name:"Updated bucketlist"})).subscribe(
                    (data:any) => {expect(data.message).toEqual("Bucketlist 1 successfully updated!")}
                );
            });
        
        it("should delete a single bucketlist", () => {
            let mockResponse = JSON.stringify({message: "The bucketlist with id 1 has been deleted" });
            let mockBackend = TestBed.get(MockBackend);
            let apiService = TestBed.get(ApiService);

            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
            });

            apiService.deleteBucketlist(1).subscribe(
                (data:any) => {expect(data.message).toEqual("The bucketlist with id 1 has been deleted")}
            );
        });

        it('should create a bucketlist item', () => {
                let mockResponse = JSON.stringify({message: "Bucketlist item successfully created!"});
                let mockBackend = TestBed.get(MockBackend);
                let apiService = TestBed.get(ApiService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                apiService.createBucketlistItem(1, JSON.stringify({name:"New item"})).subscribe(
                    (data:any) => {expect(data.message).toEqual("Bucketlist item successfully created!")}
                );
            });
        
        it('should update a bucketlist item', () => {
                let mockResponse = JSON.stringify({message: "Bucketlist item successfully updated!"});
                let mockBackend = TestBed.get(MockBackend);
                let apiService = TestBed.get(ApiService);

                mockBackend.connections.subscribe((conn: any) => {
                    conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
                });
                apiService.updateBucketlistItem(1, 1, JSON.stringify({name:"Updated item"})).subscribe(
                    (data:any) => {expect(data.message).toEqual("Bucketlist item successfully updated!")}
                );
            });
        
        it("should delete a bucketlist item", () => {
            let mockResponse = JSON.stringify({message: "The bucketlist item with id 1 has been deleted" });
            let mockBackend = TestBed.get(MockBackend);
            let apiService = TestBed.get(ApiService);

            mockBackend.connections.subscribe((conn: any) => {
                conn.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
            });

            apiService.deleteBucketlistItem(1,1).subscribe(
                (data:any) => {expect(data.message).toEqual("The bucketlist item with id 1 has been deleted")}
            );
        });
    });
}
