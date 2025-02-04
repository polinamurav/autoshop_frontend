import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { AutomobileCardComponent } from './components/automobile-card/automobile-card.component';



@NgModule({
  declarations: [
    AutomobileCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
    exports: [
        AutomobileCardComponent
    ]
})
export class SharedModule { }
