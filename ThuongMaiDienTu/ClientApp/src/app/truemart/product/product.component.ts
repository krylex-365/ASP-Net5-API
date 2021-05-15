import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../models/card';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import jwt_decode from 'jwt-decode';
import { CardService } from '../../../services/card.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductShopComponent implements OnInit {
  review: Review;
  reviews: Array<Review>;
  product: Product;
  products: Array<Product>;
  pros: Array<Product>;
  
  //Login
  currentUser;
  token;

  constructor(private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private cardService: CardService,  ) { }

  async ngOnInit() {

    const productId = String(this.route.snapshot.paramMap.get('id'));

    await this.productService.getProductById(productId).subscribe(
      result => {
        this.product = result;

        console.log(this.product);
      });
    await this.reviewService.getReviewByProductId(productId).subscribe(result => {
      this.review = result;
      console.log(this.review);
    })
      
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);
    }

    await this.productService.getProducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);

        this.realtedProducts();
      });
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

  realtedProducts() {
    this.pros = Array<Product>();
    this.products.forEach(pro => {
      if (pro.subcategoryId == this.product.subcategoryId && pro.productId != this.product.productId) {
        this.pros.push(pro);
      }
    })
    console.log(this.pros);
  }

  refresh(): void {
    window.location.reload();
  }
}
