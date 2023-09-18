import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Brand } from 'src/app/modules/brands';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  brands: Brand[] | null = null;
  paginationResult: any = {};
  ngOnInit(): void {
    this.loadBrands(1, 10);
  }

  constructor(private brandServices: BrandsService) {}
  loadBrands(page: number, limit: number) {
    this.brandServices.getbrands(page, limit).subscribe((data: any) => {
      this.brands = data.data;
      this.paginationResult = data.paginationResult;
    });
  }
  nextPage() {
    if (
      this.paginationResult.currentPage < this.paginationResult.numberOfPages
    ) {
      const nextPageNumber = this.paginationResult.currentPage + 1;
      this.loadBrands(nextPageNumber, this.paginationResult.limit);
    }
  }

  prevPage() {
    if (this.paginationResult.currentPage > 1) {
      const prevPageNumber = this.paginationResult.currentPage - 1;
      this.loadBrands(prevPageNumber, this.paginationResult.limit);
    }
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
