import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatAllComponent} from "./stat-all/stat-all.component";
import {StatsComponent} from "./stats/stats.component";

const routes: Routes = [
  {path: 'stats', component: StatsComponent},
  {path: 'stats/all', component: StatAllComponent},
  // {path: 'stats/income', component: StatAllComponent},
  // {path: 'stats/count', component: StatAllComponent},
  // {path: 'stats/model', component: StatAllComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatRoutingModule { }
