import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from './common/layout/auth/auth.component';
import {SiteComponent} from './common/layout/site/site.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";


const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'reg', component: RegistrationPageComponent}
    ]
  },
  {
    path: 'site', component: SiteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
