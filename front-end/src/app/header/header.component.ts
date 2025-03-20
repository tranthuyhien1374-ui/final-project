import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TheoDoiDonHangComponent } from '../theo-doi-don-hang/theo-doi-don-hang.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, CommonModule]
})
export class HeaderComponent {
  isVisible = true; // Trạng thái hiển thị header
  private lastScrollY = 0;
  searchQuery: string = '';
  isLoggedIn: boolean = false; // Trạng thái đăng nhập (giả lập)
  private router: Router; // Khai báo router là thuộc tính của class

  constructor(router: Router) {
    this.router = router; // Gán giá trị inject vào thuộc tính
  }


  onSearch() {
    if (this.searchQuery) {
      console.log('Searching for:', this.searchQuery);
      // Logic tìm kiếm sẽ được thêm sau (tích hợp API)
    }
  }

  onLogout() {
    console.log('Logout clicked');
    this.isLoggedIn = false; // Cập nhật trạng thái đăng nhập
    this.router.navigate(['/']); // Quay lại trang chủ sau khi logout
  }

  navigateToLogin() {
    console.log('Navigating to Đăng nhập');
    this.router.navigate(['/dang-nhap']);
  }

  // Giả lập đăng nhập (sẽ thay bằng logic thực tế sau)
  login() {
    this.isLoggedIn = true;
    this.router.navigate(['/']);
  }


  navigateToHome(){
    this.router.navigate(['/trang-chu']);
  }

  navigateToTheodoidonhang(){
    this.router.navigate(['/theo-doi-don-hang']);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 50) {
      // Cuộn xuống và vượt quá 50px -> ẩn header
      this.isVisible = false;
    } else if (currentScrollY < this.lastScrollY) {
      // Cuộn lên -> hiện header
      this.isVisible = true;
    }

    this.lastScrollY = currentScrollY; // Cập nhật vị trí cuộn trước đó
  }

}


