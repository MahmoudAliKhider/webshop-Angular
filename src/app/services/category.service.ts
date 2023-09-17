import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
