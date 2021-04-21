import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from '../../models/Categories';
import { CategoriesService } from '../../services/categories.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
/** categories component*/
export class CategoriesComponent implements OnInit {
  /** categories ctor */
  categories: Array<Categories>;
  category: Categories;
  categoryUp: Categories; // Dung cho update
  categoryDel: Categories;

  nameUp = '';

  constructor(private categoriesSevice: CategoriesService,
    private router: Router,
    private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.categoriesSevice.getCategories().subscribe(
      result => {
        this.categories = result;
        console.log(this.categories);
      });
  }

  getCategoryDel(id: string) {
    this.categories.forEach(cate => {
      if (cate.categoryId == id) {
        this.categoryDel = cate;
      }
    })
  }

  getCategoryById(id: string) {
    this.categories.forEach(cate => {
      if (cate.categoryId == id) {
        this.category = cate;
        this.categoryUp = cate;
        this.nameUp = cate.name;
      }
    })
  }

  setCategoryUpNull() {
    this.categoryUp = null;
  }

  update(id: string, value: Categories) {
    this.category = value;
    this.category.categoryId = id;
    this.categoriesSevice.update(this.category).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  add(value: Categories) {
    this.category = value;
    this.category.categoryId = "1"; // Cho nay chay code auto tao khoa chinh ben C#
    this.categoriesSevice.add(this.category).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
        }
      });
  }

  delete(id: string) {
    this.categoriesSevice.delete(id).subscribe(
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
    console.log(this.category);
  }
}
