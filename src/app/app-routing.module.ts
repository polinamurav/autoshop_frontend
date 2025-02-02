import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: '', loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)},
      {path: '', loadChildren: () => import('./views/automobile/automobile.module').then(m => m.AutomobileModule)},
      {path: '', loadChildren: () => import('./views/models/models.module').then(m => m.ModelsModule)},
      {path: '', loadChildren: () => import('./views/application/application.module').then(m => m.ApplicationModule)},
      {path: '', loadChildren: () => import('./views/account/account.module').then(m => m.AccountModule)},
      {path: '', loadChildren: () => import('./views/stat/stat.module').then(m => m.StatModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
