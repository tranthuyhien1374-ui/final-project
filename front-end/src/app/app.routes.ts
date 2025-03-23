import { ResolveFn, Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { TuTruyenComponent } from './tu-truyen/tu-truyen.component';
import { TatCaTruyenComponent } from './tat-ca-truyen/tat-ca-truyen.component';
import { ChiTietTruyenComponent } from './chi-tiet-truyen/chi-tiet-truyen.component';
import { DocTruyenComponent } from './doc-truyen/doc-truyen.component';
import { TatCaBlogComponent } from './tat-ca-blog/tat-ca-blog.component';
import { ChiTietBlogComponent } from './chi-tiet-blog/chi-tiet-blog.component';
import { TheoDoiDonHangComponent } from './theo-doi-don-hang/theo-doi-don-hang.component';
import { TacGiaComponent } from './tac-gia/tac-gia.component';
import { ChiTietTacGiaComponent } from './chi-tiet-tac-gia/chi-tiet-tac-gia.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
// import { LienHeComponent } from './lien-he/lien-he.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ThanhToanChuyenKhoanComponent } from './thanh-toan-chuyen-khoan/thanh-toan-chuyen-khoan.component';
import { ChiTietSanPhamComponent } from './chi-tiet-san-pham/chi-tiet-san-pham.component';
import { GioHangComponent } from './gio-hang/gio-hang.component';
import { ProductService } from './services/product.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { VietTruyenComponent } from './viet-truyen/viet-truyen.component';

export const productBreadcrumbResolver: ResolveFn<string> = (route) => {
  const productService = inject(ProductService);
  const productId = route.paramMap.get('id');
  // Fetch product name from service (mocked here)
  return of(`Sản phẩm ${productId}`); // Replace with actual service call
};


export const routes: Routes = [
    { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'tu-truyen', component: TuTruyenComponent },
  { path: 'tat-ca-truyen', component: TatCaTruyenComponent },
  { path: 'chi-tiet-truyen', component: ChiTietTruyenComponent },
  { path : 'doc-truyen', component: DocTruyenComponent},
  {path: 'tat-ca-blog', component: TatCaBlogComponent},
  {path: 'chi-tiet-blog', component: ChiTietBlogComponent},
  { path: 'theo-doi-don-hang', component: TheoDoiDonHangComponent },
  { path: 'tac-gia', component: TacGiaComponent },
  { path: 'chi-tiet-tac-gia', component: ChiTietTacGiaComponent },
  {path : 'dang-nhap', component: DangNhapComponent},
  // { path: 'lien-he', component: LienHeComponent },
  { path: 'thanh-toan', component: ThanhToanComponent },
    { path: 'thanh-toan-chuyen-khoan', component: ThanhToanChuyenKhoanComponent },
    { path: 'product-page',
       component: ProductPageComponent,
       data: { breadcrumb: 'Vườn sách' } },
    { path: 'chi-tiet-san-pham', 
      component: ChiTietSanPhamComponent,
      data: { breadcrumb: 'Danh sách sản phẩm' } },
    { path: 'gio-hang', component: GioHangComponent }, // Route cho trang giỏ hàng
    { path: 'chi-tiet-san-pham/:id', component: ChiTietSanPhamComponent },
    // {
    //   path: 'products/:id',
    //   component: ChiTietSanPhamComponent,
    //   resolve: { breadcrumb: productBreadcrumbResolver },
    //   data: { breadcrumb: null } // Will be overridden by resolver
    // }
  { path: 'viet-truyen', component: VietTruyenComponent }
]
