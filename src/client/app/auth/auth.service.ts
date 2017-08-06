import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { content_headers } from '../shared/headers';
import { JwtHelper } from 'angular2-jwt/angular2-jwt';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private api_url = 'https://prue-bucketlists.herokuapp.com/';

  constructor(private _http: Http, private jwtHelper: JwtHelper) { }

  // Send a login request to the server using user provided data
  public login(body: string) {
    let response = this._http.post(this.api_url + 'auth/login', body, { headers: content_headers });
    localStorage.setItem('userEmail', JSON.parse(body).email);
    return response.map(res => this.extractToken(res));
  }

  // Register a new user
  public register(body: string) {
    let response = this._http.post(this.api_url + 'auth/register', body, { headers: content_headers });
    return response;
  }

  // Extract token from response
  private extractToken(res: Response) {
    if (res.status == 200) {
      let token = res.json()['access_token'];
      localStorage.setItem('token', res.json()['access_token']);
    }
    return res;
  }


  // Check if the current user is authenticated
  public isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  // Add token to header
  public getAuthHeaders() {
    content_headers.set('Authorization', 'JWT ' + localStorage.getItem('token'));
    return content_headers;
  }

  //log user out
  public logout() {
    if (this.isAuthenticated()) {
      localStorage.clear();
      return true;
    }
    return false;
  }

}

// @Injectable()
// export class foo {

//   private loginSuccessful: boolean = true;


//   constructor(private http: Http,
//     private router: Router) {

//   }


//   public isAuthenticated() {
//     return !this.checkTokenExpired();
//   }

//   public clearUserDataAndRedirect() {
//     localStorage.clear();
//     this.router.navigate(['/sessionexpired']);
//   }


//   // Sends a login request
//   public login(body: string) {
//     return this.http.post('/auth/login', body, jsonHeader())
//       .map(this.extractToken)
//       .catch(this.handleError);
//   }

//   /**
//    * Logout method to send a logout request to the server and clear localStorage
//    */
//   public logout() {
//     if (this.isAuthenticated()) {
//       this.postResource('', '/api/logoutuser')
//         .subscribe(data => this.handleLogout(data),
//         error => {
//           if (error.status === 401) {
//             this.router.navigate(['/sessionexpired']);
//           }
//         },
//         () => console.log('got data')
//         );
//     } else {
//       this.clearUserDataAndRedirect();
//     }
//   }

//   /**
//    *
//    * Post resource to send a post request to the server.
//    * Extracts the current token from the local storage else redirects to
//    * session expired modal.
//    */
//   public postResource(body: String, url: string) {
//     let token = localStorage.getItem('token');
//     let headers = new Headers({ 'Authentication-Token': token });
//     headers.append('Content-Type', 'application/json');
//     let options = new RequestOptions({ headers: headers });
//     return this.http.post(url, body, options);
//   }


//   /**
//    * Get resource to fetch data from server using an end point as `url`
//    */
//   public getResource(url: string) {
//     let token = localStorage.getItem('token');
//     let headers = new Headers({ 'Authentication-Token': token });
//     let options = new RequestOptions({ headers: headers });
//     return this.http.get(url, options);
//   }

//   private extractToken(res: Response) {
//     let body = res.json();
//     if (res.status === 200) {
//       let response = 'response';
//       let user = 'user';
//       let tokenString = 'authentication_token';
//       let token = body[response][user][tokenString];
//       let maxTokenExpiryTime =
//         Math.floor(new Date().getTime() / 1000) + Number(body[response][user]['token_age']);
//       localStorage.setItem('token', token);
//       localStorage.setItem('token_age', String(maxTokenExpiryTime));
//     }
//   }

//   /**
//    *
//    * This function checks if the current token of the app has been expired
//    * based on the first time authentication from server
//    */
//   private checkTokenExpired() {

//     let expiryTime = Number(localStorage.getItem('token_age'));
//     let curTime = Math.floor(new Date().getTime() / 1000);
//     if (curTime > expiryTime) {
//       return true;
//     }
//     return false;
//   }

//   private handleError(error: any) {
//     // In a real world app, we might use a remote logging infrastructure
//     // We'd also dig deeper into the error to get a better message
//     let errMsg = (error.message) ? error.message :
//       error.status ? `${error.status} - ${error.statusText}` : 'Server error';
//     console.error(errMsg); // log to console instead
//     return Observable.throw(errMsg);
//   }

//   /**
//    *
//    * On logout, clear the local storage and redirect to login page
//    */
//   private handleLogout(data: Response) {
//     if (data.status === 200) {
//       localStorage.clear();
//       this.router.navigate(['/login']);
//     }
//   }
