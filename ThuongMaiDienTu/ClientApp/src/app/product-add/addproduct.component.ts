import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { Subcategories } from '../../models/Subcategories';
import { Page404Service } from '../../services/page404.service';
import { ProductService } from '../../services/product.service';
import { ReloadService } from '../../services/reload.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
/** product component*/
export class AddproductComponent implements OnInit {
  /** product ctor */
  product: Product;
  subcategories: Array<Subcategories>;
  
  subcategoryId = '1';
  status = '1';
  reponse: any;

  constructor(private prodcutService: ProductService,
    private subcategoryService: SubcategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private page404: Page404Service,
    private reload: ReloadService   ) { }

  ngOnInit() {
    this.page404.go();

    this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.subcategories = result;
        console.log(this.subcategories);
      });
  }

  add(product: Product) {
    product.productId = "1" //Gan tam de C# xu ly
    product.review = null;
    product.orderDetail = null;
    product.price = "" + product.price;
    product.quantity = "" + product.quantity;
    product.sale = "" + product.sale;
    product.image = product.image.substr(product.image.lastIndexOf("\\") + 1); //tach lay ten file

    this.prodcutService.add(product).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Add product successfully!');
          });
          this.redirectProducts();
        } else {
          $(document).ready(function () {
            alert('Add product fail! Some error has occurred.');
          });
        }
      });
  }

  refresh(): void {
    window.location.reload();
  }

  redirectProducts() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/products');
  }
}
