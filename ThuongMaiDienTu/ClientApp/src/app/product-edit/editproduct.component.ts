import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/Product';
import { Subcategories } from '../../models/Subcategories';
import { Page404Service } from '../../services/page404.service';
import { ProductService } from '../../services/product.service';
import { EditproductService } from '../../services/productedit.service';
import { ReloadService } from '../../services/reload.service';
import { SubcategoriesService } from '../../services/subcategories.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
/** product component*/
export class EditproductComponent {
  /** product ctor */

  product: Product;
  subcategories: Array<Subcategories>;

  productId: string;
  name: string;
  price: string;
  description: string;
  image: string;
  sale: string;
  status: string;
  quantity: string;
  subcategoryId: string;

  constructor(private prodcutService: ProductService,
    private subcategoryService: SubcategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private page404: Page404Service,
    private reload: ReloadService   ) {
  }

  ngOnInit() {
    this.page404.go();

    this.subcategoryService.getSubcategories().subscribe(
      result => {
        this.subcategories = result;
        console.log(this.subcategories);
      });

    const productId = String(this.route.snapshot.paramMap.get('id'));

    this.prodcutService.getProductById(productId).subscribe(
      result => {
        this.product = result;

        this.productId = this.product.productId;
        this.name = this.product.name;
        this.price = this.product.price;
        this.description = this.product.description;
        this.image = this.product.image;
        this.sale = this.product.sale;
        this.quantity = this.product.quantity;
        this.subcategoryId = this.product.subcategoryId;
        this.status = this.product.status;

        console.log(this.product);
      });
  }

  update(product: Product) {
    product.productId = this.productId;
    product.review = null;
    product.orderDetail = null;
    product.price = "" + product.price;
    product.quantity = "" + product.quantity;
    product.sale = "" + product.sale;
    if (product.image == null) {
      product.image = this.image;
    }
    product.image = product.image.substr(product.image.lastIndexOf("\\") + 1); //tach lay ten file

    this.prodcutService.update(product).subscribe(
      result => {
        console.log(result);
        if (result.status == 200) {
          this.redirectProducts();
        }
      });
  }

  redirectProducts() {
    this.reload.reload = "1";
    this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || 'admin/products');
  }
}
