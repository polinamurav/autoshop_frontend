import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationsComponent } from './applications/applications.component';


@NgModule({
  declarations: [
    ApplicationsComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
