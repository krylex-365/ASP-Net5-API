import { Order } from "./Order";
import { OrderDetail } from "./orderDetail";

export class Checkout {
  order: Order;
  orderDetails: Array<OrderDetail>;
}
