import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomobileRoutingModule } from './automobile-routing.module';
import { AutomobileComponent } from './automobile/automobile.component';
import { AutomobileAddComponent } from './automobile-add/automobile-add.component';
import { AutomobileEditComponent } from './automobile-edit/automobile-edit.component';
import { AutomobilesComponent } from './automobiles/automobiles.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AutomobileComponent,
    AutomobileAddComponent,
    AutomobileEditComponent,
    AutomobilesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AutomobileRoutingModule
  ]
})
export class AutomobileModule { }
