import { Component } from '@angular/core';
import { Customer } from '../../models/customer';
import { Order } from '../../models/order';
import { OrderDetail } from '../../models/orderDetail';
import { Product } from '../../models/Product';
import { CustomerService } from '../../services/customer.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
/** order component*/
export class OrderComponent {
  /** order ctor */
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

  constructor(private orderService: OrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    private orderDetailService: OrderDetailService) { }

  async ngOnInit() {
    await this.customerService.getCustomers().subscribe(
      result => {
        this.customers = result;
        console.log(this.customers);
      });
    await this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);
      });
    await this.orderDetailService.getOrderDetails().subscribe(
      result => {
        this.orderDetails = result;
        console.log(this.orderDetails);
      });
    this.orderService.getOrders().subscribe(
      result => {
        this.orders = result;
        console.log(this.orders);
      });
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
}
