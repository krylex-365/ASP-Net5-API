import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../models/card';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import jwt_decode from 'jwt-decode';
import { CardService } from '../../../services/card.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductShopComponent implements OnInit {

  product: Product;

  //Login
  currentUser;
  token;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cardService: CardService,  ) { }

  ngOnInit() {

    const productId = String(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(productId).subscribe(
      result => {
        this.product = result;

        console.log(this.product);
      });

    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);
    }
    
  }

  addToCard(id) {
    console.log(id);
    const card = new Card;
    card.cardId = "1";
    card.customerId = this.token.CustomerId;
    card.productId = id;
    this.cardService.add(card).subscribe(
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
}
