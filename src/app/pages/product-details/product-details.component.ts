import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductResponse } from 'src/app/modules/product';
import { Review } from 'src/app/modules/review';
import { ProductService } from 'src/app/services/products.service';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  productId: string = '';
  product: Product | null = null;
  reviews: Review[] = [];
  reviewForm: FormGroup | null = null;
  ratingsList: number[] = [1, 2, 3, 4, 5];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private reviewService: ReviewsService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];

    this.loadProduct();
    this.initializeForm();
    this.fetchReviews();
  }

  private initializeForm() {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      ratings: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  private loadProduct() {
    this.productService
      .getProduct(this.productId)
      .pipe(takeUntil(this.dispose$))
      .subscribe(
        (response: ProductResponse) => {
          this.product = response.data;
        },
        (error) => console.error(error)
      );
  }

  onSubmit() {
    if (this.reviewForm?.valid) {
      const reviewData = this.reviewForm.value;
      reviewData.product = this.route.snapshot.params['id']; // Add productId to the review data

      this.reviewService.createReview(reviewData).subscribe(
        (response) => {
          window.location.href;
          this.reviewForm?.reset({
            ratings: 5,
          });
        },
        (error) => {
          console.error(error);
          this.toaster.warning(error.error.errors[0].msg);
        }
      );
    }
  }

  fetchReviews() {
    this.reviewService.getAllReviewsForProduct(this.productId).subscribe(
      (response) => {
        this.reviews = response.data;
        console.log(response.data)
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
