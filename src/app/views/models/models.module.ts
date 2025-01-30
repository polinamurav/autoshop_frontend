import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelsRoutingModule } from './models-routing.module';
import { CarModelComponent } from './car-model/car-model.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CarModelComponent
  ],
  imports: [
    CommonModule,
    ModelsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ModelsModule { }
