import { Component } from '@angular/core';

import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
/** product component*/
export class ProductComponent {
    /** product ctor */
    constructor(private prodcutService: ProductService) {

    }
}
