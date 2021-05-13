import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../../../models/Categories';
import { Subcategories } from '../../../models/subcategories';
import { CardService } from '../../../services/card.service';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { CategoriesService } from '../../../services/categories.service';
import { LoginService } from '../../../services/login.service';
import { ReloadService } from '../../../services/reload.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
import jwt_decode from 'jwt-decode';
import { Card } from '../../../models/card';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
declare var $: any;
@Component({
  selector: 'app-truemart-form',
  templateUrl: './truemart-form.component.html',
  styleUrls: ['./truemart-form.component.css']
})
/** truemart-form component*/
export class TruemartFormComponent implements OnInit {
  /** truemart-form ctor */

  categories: Array<Categories>;
  subcategories: Array<Subcategories>;
  subcates: Array<Subcategories>;
  products: Array<Product>;
  //Customer
  customer: Customer;
  //login
  currentUser;
  token;
  cards: Array<Card>;
  pros: Array<Product>;
  cardId;

  constructor(private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private cardService: CardService,
    private productService: ProductService,
    private reload: ReloadService,
    private customerService: CustomerService  ) { }

  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if(this.currentUser != null) {
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
                  this.cards.forEach(ca => {
                    if (pro.productId == ca.productId) {
                      this.pros.push(pro);
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
      await this.customerService.getCustomerById(customerId).subscribe(
        result => {
          this.customer = result;
          console.log(this.customer);
        });
    }

    await this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.subcategories = result;
        console.log(this.subcategories);
      });
    this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });

    $(document).ready(function () {

      /*----------------------------
      15. ScrollUp Activation
      -----------------------------*/
      $.scrollUp({
        scrollName: 'scrollUp', // Element ID
        topDistance: '550', // Distance from top before showing element (px)
        topSpeed: 1000, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        scrollSpeed: 900,
        animationInSpeed: 1000, // Animation in speed (ms)
        animationOutSpeed: 1000, // Animation out speed (ms)
        scrollText: '<i class="fa fa-angle-double-up" aria-hidden="true"></i>', // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
      });

      /*----------------------------
      16. Sticky-Menu Activation
      ------------------------------ */
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $('.header-sticky').addClass("sticky");
        } else {
          $('.header-sticky').removeClass("sticky");
        }
      });

      /*----------------------------
      17. Nice Select Activation
      ------------------------------ */
      $('select').niceSelect();
    })
  }

  getSubcategoriesByCategoryId(id): Array<Subcategories> {
    this.subcates = Array<Subcategories>();
    this.subcategories.forEach(sub => {
      if (sub.categoryId == id) {
        this.subcates.push(sub);
      }
    });
    return this.subcates;
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

  logout() {
    this.loginService.logout().subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  subtotal() {
    var total = 0;
    this.pros.forEach(pro => {
      total += Number.parseFloat(pro.price);
    })
    return total;
  }

  refresh(): void {
    window.location.reload();
  }

  redirectShop() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'shop');
  }
}
