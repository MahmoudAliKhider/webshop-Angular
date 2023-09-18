import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from 'src/app/modules/category';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  private readonly dispose$ = new Subject();

  categories: Category[] | null = null;
  paginationResult: any = {};

  constructor(private category: CategoryService) {}
  ngOnInit(): void {
    this.loadCategories(1, 10);
  }

  loadCategories(page: number, limit: number) {
    this.category.getCategories(page, limit).subscribe((data: any) => {
      this.categories = data.data;
      this.paginationResult = data.paginationResult;
      console.log(this.paginationResult);
    });
  }
  nextPage() {
    if (
      this.paginationResult.currentPage < this.paginationResult.numberOfPages
    ) {
      const nextPageNumber = this.paginationResult.currentPage + 1;
      this.loadCategories(nextPageNumber, this.paginationResult.limit);
    }
  }

  prevPage() {
    if (this.paginationResult.currentPage > 1) {
      const prevPageNumber = this.paginationResult.currentPage - 1;
      this.loadCategories(prevPageNumber, this.paginationResult.limit);
    }
  }

  ngOnDestroy(): void {
    this.dispose$.next(null);
    this.dispose$.complete();
  }
}
