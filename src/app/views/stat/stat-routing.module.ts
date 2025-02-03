import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatAllComponent} from "./stat-all/stat-all.component";
import {StatsComponent} from "./stats/stats.component";
import {StatIncomeComponent} from "./stat-income/stat-income.component";
import {StatCountComponent} from "./stat-count/stat-count.component";
import {StatModelComponent} from "./stat-model/stat-model.component";

const routes: Routes = [
  {path: 'stats', component: StatsComponent},
  {path: 'stats/all', component: StatAllComponent},
  {path: 'stats/income', component: StatIncomeComponent},
  {path: 'stats/count', component: StatCountComponent},
  {path: 'stats/model', component: StatModelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
