import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from 'src/app/modules/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  products: any[] = [];
  result: any;

  paginationResult: any = {
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
    limit: 6,
  };
  queryParams: { [key: string]: string } = {
    limit: `${this.paginationResult.limit}`,
    page: '1',
  };

  constructor(private productservice: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productservice
      .getAllProducts(this.queryParams)
      .subscribe((data: any) => {
        this.products = data.data;
        console.log(data);
        this.result = data.results;
        this.paginationResult = {
          totalItems: data.paginationResult.totalItems,
          totalPages: data.paginationResult.numberOfPages,
          currentPage: data.paginationResult.currentPage,
          limit: data.paginationResult.limit,
        };
      });
  }
  applySort(sortOption: string) {
    this.queryParams['sort'] = sortOption;
    this.loadProducts();
  }

  nextPage() {
    if (this.paginationResult.currentPage < this.paginationResult.totalPages) {
      this.queryParams['page'] = (
        parseInt(this.queryParams['page']) + 1
      ).toString();
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.paginationResult.currentPage > 1) {
      this.queryParams['page'] = (
        parseInt(this.queryParams['page']) - 1
      ).toString();
      this.loadProducts();
    }
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
