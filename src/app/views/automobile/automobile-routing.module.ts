import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AutomobilesComponent} from "./automobiles/automobiles.component";
import {AutomobileAddComponent} from "./automobile-add/automobile-add.component";
import {AutomobileComponent} from "./automobile/automobile.component";

const routes: Routes = [
  {path: 'automobiles', component: AutomobilesComponent},
  {path: 'automobiles/:id', component: AutomobileComponent},
  {path: 'automobiles/add', component: AutomobileAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomobileRoutingModule { }
