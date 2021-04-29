import { Component, OnInit } from '@angular/core';
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

  constructor(private categoryService: CategoriesService,
    private productService: ProductService  ) { }

  async ngOnInit() {
    this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);
      });
    this.categoryService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });
  }

  addToCart(id) {
    console.log(id);
  }

}
