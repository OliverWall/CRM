import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from './common/layouts/auth/auth.component';
import {SiteComponent} from './common/layouts/site/site.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {OverviewPageComponent} from "./overview-page/overview-page.component";
import {AuthGuard} from "./common/guards/auth.guard";


const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'registration', component: RegistrationPageComponent}
    ]
  },
  {
    path: 'site', component: SiteComponent,canActivate: [AuthGuard], children: [
      {path: 'overview', component: OverviewPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
