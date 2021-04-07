import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { WebFormComponent } from './web-form/web-form.component';
import { RoleComponent } from './role/role.component';
import { RoleService } from '../services/role.service';
import AccountComponent from './account/account.component';
import { AccountService } from '../services/account.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from '../services/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from '../services/categories.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RoleComponent,
    AccountComponent,
    LoginComponent,
    DashboardComponent,
    WebFormComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'role', component: RoleComponent },
      { path: 'account', component: AccountComponent },
      { path: 'admin/login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoriesComponent },
    ]),
  ],
  providers: [
    RoleService,
    AccountService,
    LoginService,
    DashboardService,
    CategoriesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
