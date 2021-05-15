import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../../../models/Categories';
import { Product } from '../../../models/Product';
import { Subcategories } from '../../../models/subcategories';
import { CardService } from '../../../services/card.service';
import { CategoriesService } from '../../../services/categories.service';
import { LoginService } from '../../../services/login.service';
import { ProductService } from '../../../services/product.service';
import { ReloadService } from '../../../services/reload.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
import jwt_decode from 'jwt-decode';
import { Card } from '../../../models/card';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
import { max } from 'rxjs/operators';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  categories: Array<Categories>;
  /*subcategories: Array<Subcategories>;*/
  products: Array<Product>;
  prods: Array<Product>;
  subcategories: Array<Subcategories>;
  subcates: Array<Subcategories>;

  //Login
  currentUser;
  token;

  //Customer
  customer: Customer;

  bool: boolean;

  //error
  reponse: any;

  //page
  allProducts: Array<Product>
  indexPage: number;
  maxPage: number;
  sizePage: number;
  modPage: number;
  arNum: Array<Number>;

  constructor(private categoryService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService,
    private cardService: CardService,
    private subcategoryService: SubcategoriesService,
    private customerService: CustomerService  ) { }

  async ngOnInit() {
    this.reload.refresh();

    const id = String(this.route.snapshot.paramMap.get('id'));

    await this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.subcategories = result;
        console.log(this.subcategories);
      });
    
    await this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        if (id != 'null') {
          this.prods = Array<Product>();
          if (id.substring(0, 1) == "s") {
            this.products.forEach(pro => {
              if (id.substring(1) == pro.subcategoryId) {
                this.prods.push(pro);
              }
            })
            this.products = this.prods;
          } else {
            if (id.substring(0, 1) == "c") {
              this.subcates = Array<Subcategories>();
              this.subcategories.forEach(sub => {
                if (sub.categoryId == id.substring(1)) {
                  this.subcates.push(sub);
                }
              });
              this.products.forEach(pro => {
                this.bool = false;
                this.subcates.forEach(sub => {
                  if (pro.subcategoryId == sub.subcategoryId) {
                    this.bool = true;
                  }
                })
                if (this.bool) {
                  this.prods.push(pro);
                }
              });
              this.products = this.prods;
            } else {
              var name = id.substring(1);
              this.products.forEach(pro => {
                if (pro.name.indexOf(name) != -1) {
                  this.prods.push(pro);
                }
              })
              this.products = this.prods;
            }
          }
        }
        console.log(this.products);

        //Lay 12 product dau tien
        this.allProducts = this.products;
        this.sizePage = 12;
        this.maxPage = Number.parseInt((this.allProducts.length / this.sizePage) + "");
        this.modPage = this.allProducts.length % this.sizePage;
        if (this.modPage != 0) {
          this.maxPage++;
        }
        this.arNum = Array<Number>();
        for (var i = 0; i < this.maxPage; i++) {
          this.arNum.push(i);
        }
        
        this.setPage(0);
      });

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);

      //Customer
      var customerId = this.token.CustomerId;
      await this.customerService.getCustomerById(customerId).subscribe(
        result => {
          this.customer = result;
          console.log(this.customer);
        });
    }

    await this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });

  }

  setPage(index: number) {
    this.indexPage = index;
    this.products = Array<Product>();
    if (this.indexPage == this.maxPage && this.modPage != 0) {
      for (var i = (this.indexPage + 1) * this.sizePage - this.sizePage; i < (this.indexPage + 1) * this.sizePage - (this.sizePage - this.modPage); i++) {
        this.products.push(this.allProducts[i]);
      }
    } else {
      for (var i = (this.indexPage + 1) * this.sizePage - this.sizePage; i < (this.indexPage + 1) * this.sizePage; i++) {
        this.products.push(this.allProducts[i]);
      }
    }
  }

  setIndexPage(index: number) {
    if (index < 0) {
      this.indexPage = 0;
      this.setPage(this.indexPage);
      return;
    }
    if (index == this.maxPage) {
      this.indexPage = this.maxPage - 1;
      this.setPage(this.indexPage);
      return;
    }
    this.indexPage = index;
    this.setPage(this.indexPage);
    return;
  }

  addToCard(id) {
    console.log(id);
    const card = new Card;
    card.cardId = "1";
    card.customerId = this.token.CustomerId;
    card.productId = id;
    this.cardService.add(card).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          this.refresh();
        } else {
          alert('Không thể thêm nữa!');
        }
      });
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

  refresh(): void {
    window.location.reload();
  }

}
