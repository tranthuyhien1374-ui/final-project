import { Routes } from '@angular/router';
import { TrangChuComponent } from './trang-chu/trang-chu.component';

export const routes: Routes = [
    { path: '', redirectTo: '/trang-chu', pathMatch: 'full' },
  { path: 'trang-chu', component: TrangChuComponent }
];
