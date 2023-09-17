import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  apiUrl = 'http://localhost:8000/api/v1/brands';

  constructor(private http: HttpClient) {}

  getbrands(page: number, limit: number) {
    return this.http.get(`${this.apiUrl}?page=${page}&limit=${limit}`);
  }
}
