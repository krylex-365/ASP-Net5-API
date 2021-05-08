import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}
