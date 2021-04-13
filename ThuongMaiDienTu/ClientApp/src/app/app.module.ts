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
import { RoleComponent } from './role/role.component';
import { RoleService } from '../services/role.service';
import AccountComponent from './account/account.component';
import { AccountService } from '../services/account.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from '../services/login.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { ProductComponent } from './product/product.component';
import { ProductService } from '../services/product.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from '../services/order.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from '../services/categories.service';
import { WebFormComponent } from './web-form/web-form.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddproductService } from '../services/addproduct.service';

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
    ProductComponent,
    OrderComponent,
    WebFormComponent,
    CategoriesComponent,
    AddproductComponent,
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
      { path: 'product', component: ProductComponent },
      { path: 'order', component: OrderComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'addproduct', component: AddproductComponent },
    ]),
  ],
  providers: [
    RoleService,
    AccountService,
    LoginService,
    DashboardService,
    ProductService,
    OrderService,
    CategoriesService,
    AddproductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
