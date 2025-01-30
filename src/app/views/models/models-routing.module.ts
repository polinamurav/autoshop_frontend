import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CarModelComponent} from "./car-model/car-model.component";

const routes: Routes = [
  {path: 'models', component: CarModelComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelsRoutingModule { }
