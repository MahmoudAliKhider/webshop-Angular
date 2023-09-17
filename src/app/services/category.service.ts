import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../modules/category';
import { Observable } from 'rxjs';
import { PaginationResult } from '../modules/pagination';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:8000/api/v1/categories';

  constructor(private http: HttpClient) {}

  getCategories(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
