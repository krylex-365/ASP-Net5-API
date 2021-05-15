import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Review } from '../models/Review';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getReview() {
    return this.http.get<Review[]>(this.url + 'api/Review');
  }

  getReviewByProductId(id: string) {
    return this.http.get<Review>(this.url + 'api/Review' + id);
  }

  add(review: Review) {
    return this.http.post<HttpResponse<Review>>(this.url + 'api/Review', review, { observe: 'response' });
  }
}
