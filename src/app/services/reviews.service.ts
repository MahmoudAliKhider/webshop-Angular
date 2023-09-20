import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review, ReviewResponse } from '../modules/review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private apiUrl = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/reviews`, review);
  }
  getAllReviewsForProduct(productId: string): Observable<ReviewResponse> {
    const url = `${this.apiUrl}/products/${productId}/reviews`;
    return this.http.get<ReviewResponse>(url);
  }
}
