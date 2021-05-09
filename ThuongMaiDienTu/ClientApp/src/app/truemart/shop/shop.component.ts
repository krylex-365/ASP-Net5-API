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

  bool: boolean;

  constructor(private categoryService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private reload: ReloadService,
    private cardService: CardService,
    private subcategoryService: SubcategoriesService  ) { }

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
          }
        }
        console.log(this.products);
      });

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);
    }

    await this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });

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
        if (result.status == 200) {
          this.refresh();
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
