import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../modules/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api/v1/products';

  constructor(private http: HttpClient) {}

  getAllProducts(paramsObj: { [key: string]: string }): Observable<any> {
    let params = new HttpParams();

    for (const key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }

    const url = `${this.apiUrl}?${params.toString()}`;
    return this.http.get<Product>(url);
  }

  getProduct(id:string){
  return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`)
  }
}
