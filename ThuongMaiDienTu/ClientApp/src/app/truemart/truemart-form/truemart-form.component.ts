import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../models/Categories';
import { Subcategories } from '../../../models/subcategories';
import { CategoriesService } from '../../../services/categories.service';
import { SubcategoriesService } from '../../../services/subcategories.service';
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

  constructor(private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService) { }

  async ngOnInit() {
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

}
