import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../models/Dashboard';
import { CategoriesService } from '../../services/categories.service';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { ProductService } from '../../services/product.service';
import { ReloadService } from '../../services/reload.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
/** dashboard component*/
export class DashboardComponent implements OnInit{
  /** dashboard ctor */
  dashboards: Array<Dashboard>;
  allProduct = 0;
  allCategory = 0;
  allSubcategory = 0;
  allCustomer = 0;

  constructor(private dashboardService: DashboardService,
    private productService: ProductService,
    private categoryService: CategoriesService,
    private subcategoryService: SubcategoriesService,
    private customerService: CustomerService,
    private reload: ReloadService  ) { }

  ngOnInit() {
    this.dashboardService.getNewOrders().subscribe(
      result => {
        this.dashboards = result;
        console.log(this.dashboards);
      });
    this.productService.getProducts().subscribe(
      result => {
        this.allProduct = result.length;
      }
    )
    this.categoryService.getCategories().subscribe(
      result => {
        this.allCategory = result.length;
      }
    )
    this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.allSubcategory = result.length;
      }
    )
    this.customerService.getCustomers().subscribe(
      result => {
        this.allCustomer = result.length;
      }
    )

    this.reload.refresh();
  }
}
