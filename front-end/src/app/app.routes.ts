import { Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { TuTruyenComponent } from './tu-truyen/tu-truyen.component';
import { TatCaTruyenComponent } from './tat-ca-truyen/tat-ca-truyen.component';

export const routes: Routes = [
    { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: TrangChuComponent },
  { path: 'tu-truyen', component: TuTruyenComponent },
  { path: 'tat-ca-truyen', component: TatCaTruyenComponent }
];
