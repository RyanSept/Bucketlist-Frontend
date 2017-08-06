import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { AuthenticationService } from '../auth/auth.service';
import { IBucketlist } from '../bucketlist/bucketlist.interface';

/*
* Service for accessing endpoints on the bucketlist api.
*/
@Injectable()
export class ApiService {

  private api_url = 'https://prue-bucketlists.herokuapp.com/';

  constructor(private _http: Http, private auth_service: AuthenticationService) { }

  // get bucketlists from api

  public getBucketlists(): Observable<IBucketlist[]> {
    return this._http.get(this.api_url + 'bucketlists', { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => <IBucketlist[]>response.json()['bucketlists']);
  }

  // get the bucketlist by the given id
  public getBucketlistSingle(id: number): Observable<IBucketlist> {
    return this._http.get(this.api_url + 'bucketlists/' + id, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => <IBucketlist>response.json()['bucketlist']);
  }

  // create the bucketlist with the given data
  public createBucketlist(body: string) {
    return this._http.post(this.api_url + 'bucketlists', body, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());
  }

  // update an existing bucketlist
  public updateBucketlist(id: number, body: string) {
    return this._http.put(this.api_url + 'bucketlists/' + id, body, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());
  }

  // delete a bucketlist by the given id
  public deleteBucketlist(id: number) {
    return this._http.delete(this.api_url + 'bucketlists/' + id, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());
  }

  // create a bucketlist item in the bucketlist with the given id
  public createBucketlistItem(id: number, body: string) {
    return this._http.post(this.api_url + 'bucketlists/' + id + '/items', body, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());
  }

  // update a bucketlist item in the bucketlist with the given id.
  public updateBucketlistItem(itemID: number, bucketlistID: number, body: string) {
    return this._http.put(this.api_url + 'bucketlists/' + bucketlistID + '/items/' +
      itemID, body, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());
  }

  // delete a bucketlist item
  public deleteBucketlistItem(itemID: number, bucketlistID: number) {
    return this._http.delete(this.api_url + 'bucketlists/' + bucketlistID + '/items/' +
      itemID, { headers: this.auth_service.getAuthHeaders() })
      .map((response: Response) => response.json());

  }

}


