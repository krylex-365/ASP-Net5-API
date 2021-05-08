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

  constructor(private page404: Page404Service,
    private cardService: CardService,
    private customerService: CustomerService,
    private productService: ProductService,  ) { }

  async ngOnInit() {
    this.page404.go();

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

  subtotal() {
    var total = 0;
    this.quantitys.forEach(quan => {
      total += Number.parseFloat(quan.product.price) * quan.quantity;
    })
    return total;
  }

  refresh(): void {
    window.location.reload();
  }
}
