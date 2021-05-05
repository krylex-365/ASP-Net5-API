import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import * as $ from 'jquery';
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
import { WebFormComponent } from './web-form/web-form.component';
import { EditproductComponent } from './product-edit/editproduct.component';
import { EditproductService } from '../services/productedit.service';
import { AddproductComponent } from './product-add/addproduct.component';
import { AddproductService } from '../services/productadd.service';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountProfileService } from '../services/account-profile.service';
import { UserAddComponent } from './user-add/user-add.component';
import { UserAddService } from '../services/user-add.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditService } from '../services/user-edit.service';
import { IndexComponent } from './truemart/index/index.component';
import { SubcategoriesService } from '../services/subcategories.service';
import { ReloadService } from '../services/reload.service';
import { TruemartFormComponent } from './truemart/truemart-form/truemart-form.component';
import { ProductShopComponent } from './truemart/product/product.component';
import { ProductShopService } from '../services/productshop.service';
import { ShopComponent } from './truemart/shop/shop.component';
import { LoginTruemartComponent } from './truemart/login/login.component';
import { ProfileComponent } from './truemart/profile/profile.component';
import { UserProfileService } from '../services/user-profile.service';
import { OrderDetailService } from '../services/order-detail.service';
import { CheckoutComponent } from './truemart/checkout/checkout.component';
import { RegisterComponent } from './truemart/register/register.component';
import { CartComponent } from './truemart/cart/cart.component';
import { RegisterService } from 'src/services/register.service';

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
    UserAddComponent,
    UserEditComponent,
    TruemartFormComponent,
    ShopComponent,
    ProductShopComponent,
    LoginTruemartComponent,
    ProfileComponent,
    IndexComponent,
    CartComponent,
    CheckoutComponent,
    RegisterComponent,
    /**/

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
      { path: 'products', component: ProductComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'users', component: UserAccountComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'subcategories', component: SubcategoriesComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'editproduct/:id', component: EditproductComponent },
      { path: 'profile', component: AccountProfileComponent },
      { path: 'user-add', component: UserAddComponent },
      { path: 'user-edit/:id', component: UserEditComponent },
      { path: 'indexshop', component: IndexComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/:id', component: ShopComponent },
      { path: 'productshop', component: ProductShopComponent },
      { path: 'loginshop', component: LoginTruemartComponent },
      { path: 'profileshop', component: ProfileComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'cart', component: CartComponent },
      { path: 'register', component: RegisterComponent },
      /*{ path: 'index', component: IndexComponent },*/

    ]),
  ],
  providers: [
    RoleService,
    AccountService,
    LoginService,
    DashboardService,
    ProductService,
    SubcategoriesService,
    OrderService,
    CategoriesService,
    CustomerService,
    AddproductService,
    EditproductService,
    AccountProfileService,
    UserAddService,
    UserEditService,
    ReloadService,
    OrderDetailService,
    RegisterService,
    //ProductShopService,
    //UserProfileService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
