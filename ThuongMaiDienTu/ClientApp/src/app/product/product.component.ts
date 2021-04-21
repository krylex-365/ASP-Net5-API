import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
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

  constructor(private prodcutService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private reload: ReloadService  ) {
  }

  ngOnInit() {
    this.prodcutService.getProducts().subscribe(
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
    this.prodcutService.delete(this.delProductId).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.refresh();
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
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'products');
  }
}
