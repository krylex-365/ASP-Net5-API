import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { Page404Service } from '../../services/page404.service';
import { ProductService } from '../../services/product.service';
import { ReloadService } from '../../services/reload.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
/** product component*/
export class ProductComponent implements OnInit {
  /** product ctor */
  products: Array<Product>;
  delProductId: string;
  //error
  reponse: any;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private page404: Page404Service,
    private reload: ReloadService  ) {
  }

  ngOnInit() {
    this.page404.go();

    this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);
      });
    this.reload.refresh();
  }

  setDelProductId(id: string) {
    this.delProductId = id;
  }

  delete() {
    this.productService.delete(this.delProductId).subscribe(
      result => {
        console.log(result);
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Delete product successfully!');
          });
          this.refresh();
        } else {
          $(document).ready(function () {
            alert('Delete product fail! Some error has occurred.');
          });
        }
      });
  }

  noDelete() {
    this.delProductId = null;
  }

  refresh(): void {
    window.location.reload();
  }

  redirectProducts() {
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/products');
  }
}
