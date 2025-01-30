import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './shared/layout/layout.component';
import {MainComponent} from './views/main/main.component';
import {HeaderTopComponent} from './shared/layout/header-top/header-top.component';
import {HeaderLeftComponent} from './shared/layout/header-left/header-left.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./shared/shared.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptor} from "./core/auth/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MainComponent,
    HeaderTopComponent,
    HeaderLeftComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    MatSnackBarModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
