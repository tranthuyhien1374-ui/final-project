import { Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { TuTruyenComponent } from './tu-truyen/tu-truyen.component';
import { TatCaTruyenComponent } from './tat-ca-truyen/tat-ca-truyen.component';
import { TatCaBlogComponent } from './tat-ca-blog/tat-ca-blog.component';
import { ChiTietBlogComponent } from './chi-tiet-blog/chi-tiet-blog.component';
import { TacGiaComponent } from './tac-gia/tac-gia.component';
import { ChiTietTacGiaComponent } from './chi-tiet-tac-gia/chi-tiet-tac-gia.component';
import { TheoDoiDonHangComponent } from './theo-doi-don-hang/theo-doi-don-hang.component';
import { ChiTietTruyenComponent } from './chi-tiet-truyen/chi-tiet-truyen.component';
import { DocTruyenComponent } from './doc-truyen/doc-truyen.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
export const routes: Routes = [
    { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'tu-truyen', component: TuTruyenComponent },
  { path: 'tat-ca-truyen', component: TatCaTruyenComponent },
  {path: 'tat-ca-blog', component: TatCaBlogComponent},
  {path: 'chi-tiet-blog', component: ChiTietBlogComponent},
  { path: 'theo-doi-don-hang', component: TheoDoiDonHangComponent },
  { path: 'dang-nhap', component: DangNhapComponent },
  {path: 'chi-tiet-tac-gia/:id', component: ChiTietTacGiaComponent},
  {path: 'tac-gia', component: TacGiaComponent},
  { path: 'chi-tiet-truyen/:id', component: ChiTietTruyenComponent },
  { path: 'doc-truyen/:storyId/:chapterId', component: DocTruyenComponent }
];
