import { Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { TuTruyenComponent } from './tu-truyen/tu-truyen.component';
import { TatCaTruyenComponent } from './tat-ca-truyen/tat-ca-truyen.component';
import { TatCaBlogComponent } from './tat-ca-blog/tat-ca-blog.component';
import { ChiTietBlogComponent } from './chi-tiet-blog/chi-tiet-blog.component';
import { TheoDoiDonHangComponent } from './theo-doi-don-hang/theo-doi-don-hang.component';
import { TacGiaComponent } from './tac-gia/tac-gia.component';
import { ChiTietTacGiaComponent } from './chi-tiet-tac-gia/chi-tiet-tac-gia.component';
// hdhdh
export const routes: Routes = [
    { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'tu-truyen', component: TuTruyenComponent },
  { path: 'tat-ca-truyen', component: TatCaTruyenComponent },
  {path: 'tat-ca-blog', component: TatCaBlogComponent},
  {path: 'chi-tiet-blog', component: ChiTietBlogComponent},
  { path: 'theo-doi-don-hang', component: TheoDoiDonHangComponent },
  {path: 'chi-tiet-tac-gia/:id', component: ChiTietTacGiaComponent},
  {path: 'tac-gia', component: TacGiaComponent}

];
