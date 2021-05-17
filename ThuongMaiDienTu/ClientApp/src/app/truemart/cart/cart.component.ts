import { Component, OnInit } from '@angular/core';
import { Card } from '../../../models/card';
import { Product } from '../../../models/Product';
import { Page404Service } from '../../../services/page404.service';
import jwt_decode from 'jwt-decode';
import { CardService } from '../../../services/card.service';
import { ProductService } from '../../../services/product.service';
import { QuanTity } from '../../../models/quantity';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { Order } from '../../../models/Order';
import { OrderDetail } from '../../../models/orderDetail';
import { Checkout } from '../../../models/checkout';
import { CheckoutService } from '../../../services/checkout.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: Array<Product>;

  //login
  currentUser;
  token;
  cards: Array<Card>;
  pros: Array<Product>;
  cardId;

  //Form
  quantitys: Array<QuanTity>;
  quantity: QuanTity;
  index_ls: number;

  //Customer
  customer: Customer;

  //Checkout
  checkt: Checkout
  note;
  payment;

  //total
  total;

  //Message
  Notenoughquantity: string;

  //Payment
  strikeCheckout: any = null;

  //error
  reponse: any;


  constructor(private page404: Page404Service,
    private cardService: CardService,
    private customerService: CustomerService,
    private productService: ProductService,
    private checkoutService: CheckoutService  ) { }

  async ngOnInit() {

    this.Notenoughquantity = null;

    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (this.currentUser != null) {
      this.quantitys = Array<QuanTity>();
      this.index_ls = -1;

      this.token = jwt_decode(this.currentUser.token);
      await this.cardService.getCardByCustomerId(this.token.CustomerId).subscribe(
        result => {
          this.cards = result;
          console.log(this.cards);

          this.productService.getProducts().subscribe(
            result => {
              this.products = result;
              console.log(this.products);

              if (this.cards.length > 0) {
                this.pros = Array<Product>();
                this.products.forEach(pro => {
                  this.cards.forEach(async ca => {
                    if (pro.productId == ca.productId) {
                      await this.pros.push(pro);
                      this.quantity = new QuanTity;
                      this.quantity.product = pro;
                      this.quantity.quantity = 1;
                      this.quantitys.push(this.quantity);

                      //Kiem tra so luong product vs so luong dat
                      if (Number.parseInt(this.quantity.product.quantity) < this.quantity.quantity) {
                        //Hien thi thong bao
                        this.Notenoughquantity = this.quantity.product.name + ' "Not Enough Quantity"';
                      }
                    }
                  })
                })
              }
            }
          )
        }
      )

      //Customer
      var customerId = this.token.CustomerId;
      this.customerService.getCustomerById(customerId).subscribe(
        result => {
          this.customer = result;
          console.log(this.customer);
        });

    }

    $(document).ready(function () {
      /* Set rates + misc */
      /*var shipping = 5;*/
      var fadeTime = 300;
      var tax = 5 / 100;
      /* Assign actions */
      $('.product-quantity input').change(function () {
        updateQuantity(this);
      });
      $('.product-removal button').click(function () {
        removeItem(this);
      });
      /* Recalculate cart */
      function recalculateCart() {
        var subtotal = 0;
        /* Sum up row totals */
        $('.product').each(function () {
          subtotal += parseFloat($(this).children('.product-subtotal').text());
        });
        /* Calculate totals */
        //var shipping = (subtotal > 0 ? shippingRate : 0);
        //var total = (subtotal + shipping)*tax + (subtotal + shipping);
        var total = (subtotal) * (1 + tax);
        var vat = subtotal * tax;
        /* Update totals display */
        $('.totals-value').fadeOut(fadeTime, function () {
          $('.cart-subtotal').html(subtotal.toFixed(0));
          $('.vat').html(vat.toFixed(2));
          $('.cart-total').html(total.toFixed(2));
          if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
          } else {
            $('.checkout').fadeIn(fadeTime);
          }
          $('.totals-value').fadeIn(fadeTime);
        });
      }
      /* Update quantity */
      function updateQuantity(quantityInput) {
        /* Calculate line price */
        var productRow = $(quantityInput).parent().parent();
        var price = parseFloat(productRow.children('.product-price').text());
        var quantity = $(quantityInput).val();
        var linePrice = price * quantity;
        /* Update line price display and recalc cart totals */
        productRow.children('.product-subtotal').each(function () {
          $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(0));
            recalculateCart();
            $(this).fadeIn(fadeTime);
          });
        });
      }
      /* Remove item from cart */
      function removeItem(removeButton) {
        /* Remove row from DOM and recalc cart total */
        var productRow = $(removeButton).parent().parent();
        productRow.slideUp(fadeTime, function () {
          productRow.remove();
          recalculateCart();
        });
      }
    });

    //Payment
    this.stripePaymentGateway();
  }

  deleteCard(id) {
    this.cardId = 0;
    this.cards.forEach(car => {
      if (car.productId == id) {
        this.cardId = car.cardId;
      }
    })
    this.cardService.delete(this.cardId).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  Total() {
    var total = 0;
    this.quantitys.forEach(quan => {
      if (Number.parseInt(quan.product.sale) != 0) {
        total += (Number.parseFloat(quan.product.price) * quan.quantity) - (Number.parseFloat(quan.product.price) * quan.quantity * Number.parseFloat(quan.product.sale) / 100);
      } else {
        total += Number.parseFloat(quan.product.price) * quan.quantity;
      }
    })
    this.total = total;
    return total;
  }

  checkQuantity() {
    var boo = true;
    var string = "";
    this.quantitys.forEach(quan => {
      if (Number.parseInt(quan.product.quantity) < quan.quantity) {
        boo = false;
        string = quan.product.name + ' "Not Enough Quantity"';
      }
    })
    if (boo) {
      this.Notenoughquantity = null;
    } else {
      this.Notenoughquantity = string;
    }
  }

  checkOut() {
    var order: Order;
    var orderDetail: OrderDetail;
    
    this.checkt = new Checkout();
    this.checkt.orderDetails = Array<OrderDetail>();
    order = new Order;

    order.customerId = this.token.CustomerId;
    order.date = new Date();
    if (this.note == null) {
      order.note = "NNN";
    } else {
      order.note = this.note;
    }
    order.orderId = "1"; //C# xu ly
    order.payment = "NNN";
    order.status = "1";
    order.orderDetail = null;

    this.checkt.order = order;

    for (var i = 0; i < this.quantitys.length; i++) {
      orderDetail = new OrderDetail;

      orderDetail.orderDetailId = "1" // C# xu ly
      orderDetail.orderId = "1" //C# xu ly
      orderDetail.productId = this.quantitys[i].product.productId;
      orderDetail.quantity = "" + this.quantitys[i].quantity;
      if (this.quantitys[i].product.sale != "0") {
        orderDetail.totalPrice = "" + (Number.parseFloat(this.quantitys[i].product.price) * this.quantitys[i].quantity - (Number.parseFloat(this.quantitys[i].product.price) * this.quantitys[i].quantity * Number.parseFloat(this.quantitys[i].product.sale) / 100)).toFixed(2);
      } else {
        orderDetail.totalPrice = "" + (Number.parseFloat(this.quantitys[i].product.price) * this.quantitys[i].quantity);
      }

      this.checkt.orderDetails.push(orderDetail);
    }

    if (this.Notenoughquantity == null) {
      this.checkoutService.add(this.checkt).subscribe(
        result => {
          console.log(result);
          this.reponse = result.valueOf()
          if (this.reponse.body.statusCode == 200) {
            //C# Update quantity product trong CheckoutController
            //C# delete cart trong CheckoutController
            this.makePayment(Number.parseFloat((this.total + (this.total * 0.05)).toFixed(2)));
          }
        });
    }
  }

  refresh(): void {
    window.location.reload();
  }

  //Payment
  makePayment(amount: any) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51IpYAAFHJwvecwZid8EIfhwSEEKe6N3O12NpIGrbCr4T1YSIkwEOGuubH3xzjOBifbd2GcKTfsangLi9IEKaKOQj008aRf6g42',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        $(document).ready(function () {
          alert('Stripe token generated! Your payment successfull!');
          window.location.reload();
        });
      }
    });

    strikeCheckout.open({
      name: 'User test',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = "";
      window.document.appendChild(script);
    }
  }

  stripePaymentGateway() {
    if (!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51IpYAAFHJwvecwZid8EIfhwSEEKe6N3O12NpIGrbCr4T1YSIkwEOGuubH3xzjOBifbd2GcKTfsangLi9IEKaKOQj008aRf6g42',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
          }
        });
      }

      window.document.body.appendChild(scr);
    }
  }
}
