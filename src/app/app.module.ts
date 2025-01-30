import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { MainComponent } from './views/main/main.component';
import { HeaderTopComponent } from './shared/layout/header-top/header-top.component';
import { HeaderLeftComponent } from './shared/layout/header-left/header-left.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
