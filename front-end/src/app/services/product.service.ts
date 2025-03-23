import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/sanpham'; // URL API của bạn

  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Nếu API của bạn hỗ trợ lấy sản phẩm theo ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}