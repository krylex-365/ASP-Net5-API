import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../../models/card';
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';
import jwt_decode from 'jwt-decode';
import { CardService } from '../../../services/card.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../../services/review.service';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';
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
  reviewss: Array<Review>;
  customer: Customer;
  customers: Array<Customer>;
  custname: string;
  //Login
  currentUser;
  reponse: any;
  token;
  

  constructor(private productService: ProductService,
    private customerService: CustomerService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private cardService: CardService,  ) { }

  async ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser != null) {
      this.token = jwt_decode(this.currentUser.token);
    }
    var customerId = this.token.CustomerId;
    await this.customerService.getCustomerById(customerId).subscribe(
      result => {
        this.customer = result;
        console.log(this.customer);
        
      });
  
    const productId = String(this.route.snapshot.paramMap.get('id'));

    await this.reviewService.getReview().subscribe(result => {
      this.reviews = result;
      console.log(this.reviews);

      this.reviewss = Array<Review>();
      this.getReviewByProductId(productId);
    });

    await this.customerService.getCustomers().subscribe(
      result => {
        this.customers = result;
        console.log(this.customers);
      });
    await this.productService.getProductById(productId).subscribe(
      result => {
        this.product = result;
        console.log(this.product);

      });

    this.custname = '';
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
  getCustomerById(id) {
   this.custname = "";
    for (var i = 0; i < this.customers.length; i++) {
      if (this.customers[i].customerId == id) {
        this.custname = this.customers[i].name;
        return this.customers[i].name;
      }
    }
  }
  getReviewByProductId(id) {
    this.reviewss = Array<Review>();
    this.reviews.forEach(res => {
      if (res.productId == id) {
        this.reviewss.push(res);
      }
    })
  }
  
  addReview(value) {
    this.review = new Review;
    this.review.reviewId = "1";
    this.review.comment = value.comment;
    this.review.customerId = this.token.CustomerId;
    this.review.productId = this.product.productId;
    this.review.reviewDate = new Date;
    this.reviewService.add(this.review).subscribe(
      result => {
        console.log(result)
        this.reponse = result.valueOf()
        if (this.reponse.body.statusCode == 200) {
          $(document).ready(function () {
            alert('Thank you for review.');
          });
          this.refresh();
        }
      }
    )
  }
  refresh(): void {
    window.location.reload();
  }
  
}
