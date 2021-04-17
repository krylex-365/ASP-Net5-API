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
import { UserAccountComponent } from './user-account/user-account.component';
import { CustomerService } from '../services/customer.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { SubcategoriesService } from '../services/subcategories.service';
import { WebFormComponent } from './web-form/web-form.component';
import { EditproductComponent } from './product-edit/editproduct.component';
import { EditproductService } from '../services/productedit.service';
import { AddproductComponent } from './product-add/addproduct.component';
import { AddproductService } from '../services/productadd.service';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountProfileService } from '../services/account-profile.service';



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
    UserAccountComponent,
    WebFormComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    EditproductComponent,
    AddproductComponent,
    AccountProfileComponent,
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
      { path: 'products', component: ProductComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'users', component: UserAccountComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'subcategories', component: SubcategoriesComponent },
      { path: 'addproducts', component: AddproductComponent },
      { path: 'editproducts', component: EditproductComponent },
      { path: 'accountprofile', component: AccountProfileComponent },
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
    CustomerService,
    SubcategoriesService,
    AddproductService,
    EditproductService,
    AccountProfileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
