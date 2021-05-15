import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categories } from '../../models/Categories';
import { Subcategories } from '../../models/subcategories';
import { CategoriesService } from '../../services/categories.service';
import { Page404Service } from '../../services/page404.service';
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

  //error
  reponse: any;
  subcategoryDelError;


  /** subcategories ctor */
  constructor(private subcategoriesSevice: SubcategoriesService,
    private categoriesService: CategoriesService,
    private page404: Page404Service  ) { }

  ngOnInit() {
    this.page404.go();

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

  getSubcategoryDel(subcate) {
    this.subcategoryDel = subcate;
  }

  getSubcategoryById(id: string) {
    this.subcategories.forEach(subcate => {
      if (subcate.subcategoryId == id) {
        this.subcategory = subcate;
        this.subcategoryUp = subcate;
        this.nameUp = subcate.name;
        this.categoryId = subcate.categoryId;
      }
    })
  }

  setSubcategoryUpNull() {
    this.subcategoryUp = null;
  }

  update(id: string, value: Subcategories) {
    this.subcategory = value;
    this.subcategory.subcategoryId = id;
    this.subcategoriesSevice.update(this.subcategory).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Update subcategory successfully!');
          });
          this.refresh();
        } else {
          $(document).ready(function () {
            alert('Update subcategory fail! Some error has occurred.');
          });
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
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Add subcategory successfully!');
          });
          this.refresh();
        } else {
          $(document).ready(function () {
            alert('Add subcategory fail! Some error has occurred.');
          });
        }
      });
  }

  delete(id: string) {
    this.subcategoriesSevice.delete(id).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Delete subcategory successfully!');
          });
          this.refresh();
        } else {
          this.subcategoryDelError = "Can not delete subcategory " + id + " because it still have products!";
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
