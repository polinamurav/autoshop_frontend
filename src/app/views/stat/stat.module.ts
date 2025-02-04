import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatRoutingModule } from './stat-routing.module';
import { StatAllComponent } from './stat-all/stat-all.component';
import {SharedModule} from "../../shared/shared.module";
import { StatsComponent } from './stats/stats.component';
import { StatIncomeComponent } from './stat-income/stat-income.component';
import { StatCountComponent } from './stat-count/stat-count.component';
import { StatModelComponent } from './stat-model/stat-model.component';


@NgModule({
  declarations: [
    StatAllComponent,
    StatsComponent,
    StatIncomeComponent,
    StatCountComponent,
    StatModelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatRoutingModule
  ]
})
export class StatModule { }
