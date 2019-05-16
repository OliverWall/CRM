import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {AuthComponent} from './common/layouts/auth/auth.component';
import {SiteComponent} from './common/layouts/site/site.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SiteComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    OverviewPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
