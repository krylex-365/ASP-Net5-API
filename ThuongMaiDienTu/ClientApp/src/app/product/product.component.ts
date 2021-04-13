import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
/** product component*/
export class ProductComponent {
  /** product ctor */
  products: Array<Product>;
  constructor(private prodcutService: ProductService) {
  }

  ngOnInit() {
    this.prodcutService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);
      });
  }
}
