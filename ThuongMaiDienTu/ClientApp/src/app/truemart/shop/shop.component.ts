import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../../../models/Categories';
import { Product } from '../../../models/Product';
import { Subcategories } from '../../../models/subcategories';
import { CategoriesService } from '../../../services/categories.service';
import { ProductService } from '../../../services/product.service';
import { SubcategoriesService } from '../../../services/subcategories.service';

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

  bool: boolean;

  constructor(private categoryService: CategoriesService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private subcategoryService: SubcategoriesService  ) { }

  async ngOnInit() {
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

    await this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });
  }

  addToCart(id) {
    console.log(id);
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

}
