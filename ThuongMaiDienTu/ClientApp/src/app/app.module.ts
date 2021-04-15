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
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> product
import { OrderComponent } from './order/order.component';
import { OrderService } from '../services/order.service';
import { UserAccountComponent } from './user-account/user-account.component';
import { CustomerService } from '../services/customer.service';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { SubcategoriesService } from '../services/subcategories.service';
import { WebFormComponent } from './web-form/web-form.component';
<<<<<<< HEAD
=======
import { EditproductComponent } from './editproduct/editproduct.component';
import { EditproductService } from '../services/editproduct.service';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddproductService } from '../services/addproduct.service';
>>>>>>> Stashed changes
>>>>>>> product

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
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> product
    OrderComponent,
    UserAccountComponent,
    WebFormComponent,
    CategoriesComponent,
    SubcategoriesComponent,
<<<<<<< HEAD
=======
    EditproductComponent,
    AddproductComponent,
>>>>>>> Stashed changes
>>>>>>> product
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
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
      { path: 'product', component: ProductComponent },
=======
>>>>>>> product
      { path: 'products', component: ProductComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'users', component: UserAccountComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'subcategories', component: SubcategoriesComponent },
<<<<<<< HEAD
=======
      { path: 'addproducts', component: AddproductComponent },
      { path: 'editproducts', component: EditproductComponent },
>>>>>>> Stashed changes
>>>>>>> product
    ]),
  ],
  providers: [
    RoleService,
    AccountService,
    LoginService,
    DashboardService,
    ProductService,
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
=======
>>>>>>> product
    OrderService,
    CategoriesService,
    CustomerService,
    SubcategoriesService,
<<<<<<< HEAD
=======
    AddproductService,
    EditproductService,
>>>>>>> Stashed changes
>>>>>>> product
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
