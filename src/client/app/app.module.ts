import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAuth, JwtHelper }    from 'angular2-jwt/angular2-jwt.js';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { BucketlistsModule } from './bucketlist/bucketlist.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  imports: [
    BrowserModule, HttpModule, AppRoutingModule,
    AboutModule, HomeModule, LoginModule,
    RegisterModule, SharedModule.forRoot(), BucketlistsModule,
    ToastModule.forRoot(),
    ],
  declarations: [AppComponent],
  providers: [
    // Add JWT prefix to authorization header
    provideAuth({
      headerPrefix: 'JWT'
    }),
    {
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
  JwtHelper
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
