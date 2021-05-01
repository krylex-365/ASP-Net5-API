import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../models/Categories';
import { Subcategories } from '../../models/subcategories';
import { CategoriesService } from '../../services/categories.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
    selector: 'app-subcategories',
    templateUrl: './subcategories.component.html',
    styleUrls: ['./subcategories.component.css']
})
/** subcategories component*/
export class SubcategoriesComponent implements OnInit {
  categories: Array<Categories>;
  subcategories: Array<Subcategories>;
  subcategory: Subcategories;
  subcategoryDel: Subcategories;
  subcategoryUp: Subcategories;
  categoryId = '1';
  nameUp = '';
  /** subcategories ctor */
  constructor(private subcategoriesSevice: SubcategoriesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });
    this.subcategoriesSevice.getSubcategories().subscribe(
      result => {
        this.subcategories = result;
        console.log(this.subcategories);
      });
  }

  getSubcategoryDel(id: string) {
    this.subcategories.forEach(subcate => {
      if (subcate.subcategoryId == id) {
        this.subcategoryDel = subcate;
      }
    })
  }

  getSubcategoryById(id: string) {
    this.subcategories.forEach(subcate => {
      if (subcate.subcategoryId == id) {
        this.subcategory = subcate;
        this.subcategoryUp = subcate;
        this.nameUp = subcate.name;
      }
    })
  }

  setSubcategoryUpNull() {
    this.subcategoryUp = null;
  }

  update(id: string, value: Subcategories) {
    this.subcategory = value;
    this.subcategory.categoryId = id;
    this.subcategoriesSevice.update(this.subcategory).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  add(value: Subcategories) {
    this.subcategory = value;
    this.subcategory.subcategoryId = "1"; // Cho nay chay code auto tao khoa chinh ben C#
    this.subcategory.product = null;
    this.subcategory.status = "0";
    this.subcategoriesSevice.add(this.subcategory).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  delete(id: string) {
    this.subcategoriesSevice.delete(id).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }

  showLog() {
    console.log(this.subcategory);
  }
}
