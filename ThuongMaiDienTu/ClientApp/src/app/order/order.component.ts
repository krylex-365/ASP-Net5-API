import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
/** order component*/
export class OrderComponent {
  /** order ctor */
  orders: Array<Order>;
  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.orderService.getOrders().subscribe(
      result => {
        this.orders = result;
        console.log(this.orders);
      });
  }
}
