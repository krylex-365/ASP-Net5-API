import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer';
import { Dashboard } from '../../models/Dashboard';
import { Order } from '../../models/Order';
import { OrderDetail } from '../../models/orderDetail';
import { Product } from '../../models/Product';
import { CategoriesService } from '../../services/categories.service';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { OrderService } from '../../services/order.service';
import { Page404Service } from '../../services/page404.service';
import { ProductService } from '../../services/product.service';
import { ReloadService } from '../../services/reload.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
/** dashboard component*/
export class DashboardComponent implements OnInit{
  /** dashboard ctor */
  dashboards: Array<Dashboard>;
  allProduct = 0;
  allCategory = 0;
  allSubcategory = 0;
  allCustomer = 0;
  orders: Array<Order>;
  customers: Array<Customer>;
  products: Array<Product>;
  orderDetails: Array<OrderDetail>;
  odDetails: Array<OrderDetail>;
  prods: Array<Product>;
  order: Order;
  customer: Customer;
  product: Product;
  orderDetail: OrderDetail;

  idDel: string;
  total: number;

  constructor(private dashboardService: DashboardService,
    private productService: ProductService,
    private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private reload: ReloadService,
    private page404: Page404Service) { }

  async ngOnInit() {
    this.page404.go();

    await this.customerService.getCustomers().subscribe(
      result => {
        this.customers = result;
        this.allCustomer = result.length;
        console.log(this.customers);
      });
    await this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        this.allProduct = result.length;
        console.log(this.products);
      });
    await this.orderDetailService.getOrderDetails().subscribe(
      result => {
        this.orderDetails = result;
        console.log(this.orderDetails);
      });
    await this.orderService.getOrders().subscribe(
      result => {
        this.orders = result;
        console.log(this.orders);
      });
    this.total = 0;
    await this.dashboardService.getNewOrders().subscribe(
      result => {
        this.dashboards = result;
        console.log(this.dashboards);
      });
    await this.categoryService.getCategories().subscribe(
      result => {
        this.allCategory = result.length;
      }
    )
    await this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.allSubcategory = result.length;
      }
    )

    this.reload.refresh();
  }

  getCustomerById(id: string) {
    this.customers.forEach(cus => {
      if (cus.customerId == id) {
        this.customer = cus;
      }
    })
  }

  getOrder(id: string) {
    this.orders.forEach(or => {
      if (or.orderId == id) {
        this.order = or;
      }
    })
  }

  getOrderDetailsByOrderId(orderId: string): Array<OrderDetail> {
    this.odDetails = Array<OrderDetail>();
    this.orderDetails.forEach(odd => {
      if (odd.orderId == orderId) {
        this.odDetails.push(odd);
      }
    })
    return this.odDetails;
  }

  getProductById(orderDetailId: string) {
    this.products.forEach(pro => {
      if (orderDetailId == pro.productId) {
        this.product = pro;
      }
    })
  }

  updateById(orderId: string) {
    this.orderService.updateById(orderId).subscribe(result => {
      if (result.ok) {
        this.refresh();
      }
      this.refresh();
    })
  }

  setIdDel(id: string) {
    this.idDel = id;
  }

  setNullIdDel() {
    this.idDel = null;
  }

  delete() {
    this.orderService.delete(this.idDel).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }

  caculatorTotal(num: string) {
    this.total += Number.parseFloat(num);
  }

}

function jwt_decode(token: any): boolean {
    throw new Error('Function not implemented.');
}
