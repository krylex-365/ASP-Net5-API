import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Account } from '../../../models/account';
import { Customer } from '../../../models/customer';
import { Order } from '../../../models/order';
import { OrderDetail } from '../../../models/orderDetail';
import { Product } from '../../../models/Product';
import { AccountService } from '../../../services/account.service';
import { CustomerService } from '../../../services/customer.service';
import { OrderDetailService } from '../../../services/order-detail.service';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
declare var $: any;
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
/** profile component*/
export class ProfileComponent implements OnInit{
  /** profile ctor */

  //US
  currentUser;
  token
  accountId: string;
  customerId: string;
  customer: Customer;
  account: Account;
  reponse: any;

  //ngModel
  avatar: string;
  password: string;
  address: string;
  birthday: Date;
  mail: string;
  name: string;
  phoneNumber: string;
  sex: string;
  bool: boolean;

  //order
  orders: Array<Order>;
  products: Array<Product>;
  product: Product;
  orderDetails: Array<OrderDetail>;

  //orderDetail
  order: Order;
  subTotal: number;

  constructor(private customerService: CustomerService,
    private accountService: AccountService,
    private orderService: OrderService,
    private productService: ProductService,
    private orderDetailService: OrderDetailService  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);

      //Customer
      this.customerId = this.token.CustomerId;
      this.accountId = this.token.AccountId;

      //Get customer
      this.customerService.getCustomerById(this.customerId).subscribe(
        result => {
          this.customer = result;
          console.log(this.customer);

          this.name = this.customer.name;
          this.address = this.customer.address;
          this.birthday = this.customer.birthday;
          this.mail = this.customer.mail;
          this.phoneNumber = this.customer.phoneNumber;
          this.sex = this.customer.sex;
        });
      //Get account
      this.accountService.getAccountById(this.accountId).subscribe(
        result => {
          this.account = result;
          console.log(this.account);

          this.password = this.account.password;
          this.avatar = this.account.avatar;
        });

      this.orderService.getOrdersByCustomerId(this.customerId).subscribe(
        result => {
          this.orders = result;
          console.log(this.orders);
        });

      this.productService.getProducts().subscribe(
        result => {
          this.products = result;
          console.log(this.products);
        });

      /*this.orderDetailService.getOrderDetails().subscribe(
        result => {
          this.orderDetails = result;
          console.log(this.orderDetails);
        });*/
    }


    $(document).ready(function () {
        $("#datepickerBirthday").datepicker();
    });

    this.subTotal = 0;
  }

  async update(value) {
    console.log(value);

    if (value.avatar) {
      this.account.avatar = value.avatar.substr(value.avatar.lastIndexOf("\\") + 1);
    }
    this.account.password = value.password;
    this.customer.address = value.address;
    this.customer.birthday = value.birthday;
    this.customer.mail = value.mail;
    this.customer.name = value.name;
    this.customer.phoneNumber = value.phoneNumber;
    this.customer.sex = value.sex;

    this.bool = true;

    await this.accountService.update(this.account).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode != 200) {
          this.bool = false;
        }
      });

    this.customerService.update(this.customer).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode != 200) {
          this.bool = false;
        }
      });

    if (this.bool) {
      $(document).ready(function () {
        alert('Update user successfully!');
      });
      this.refresh();
    } else {
      $(document).ready(function () {
        alert('Update user fail! Some error has occurred.');
      });
    }
  }

  getOrder(id: string) {
    this.subTotal = 0;

    for (var i = 0; i < this.orders.length; i++) {
      if (this.orders[i].orderId == id) {
        this.order = this.orders[i];
        break;
      }
    }

    //OrderDetails
    this.orderDetailService.getOrderDetailsByOrderId(id).subscribe(
      result => {
        this.orderDetails = result;
        console.log(this.orderDetails);
      }
    )
  }

  getProductByOrderDetailId(id) {
    for (var j = 0; j < this.products.length; j++) {
      if (this.products[j].productId == id) {
        this.product = this.products[j];
        return;
      }
    }
  }

  caculatorSubTotal() {
    this.subTotal = 0;
    for (var i = 0; i < this.orderDetails.length; i++) {
      this.subTotal += Number.parseInt(this.orderDetails[i].totalPrice);
    }
  }

  refresh(): void {
    window.location.reload();
  }
}
