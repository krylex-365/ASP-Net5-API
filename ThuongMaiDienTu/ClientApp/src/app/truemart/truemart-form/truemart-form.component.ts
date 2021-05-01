import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../models/Categories';
import { Subcategories } from '../../../models/subcategories';
import { CategoriesService } from '../../../services/categories.service';
import { SubcategoriesService } from '../../../services/subcategories.service';

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

  constructor(private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService ) { }

  ngOnInit(){
    this.categoryService.getCategories().subscribe(
    result => {
      this.categories = result;
      console.log(this.categories);
    });
    this.subcategoryService.getSubcategories().subscribe(
    result => {
      this.subcategories = result;
      console.log(this.subcategories);
    });
  }

  getSubcategoriesByCategoryId(id) {
    this.subcates = null;
    this.subcategories.forEach(sub => {
      if (sub.categoryId = id) {
        this.subcates.push(sub);
      }
    })
  }
 
}
