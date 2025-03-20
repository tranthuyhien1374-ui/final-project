import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class HeaderComponent {
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

  // Hàm động để chuyển hướng đến trang Theo dõi đơn hàng
  navigateToTheodoidonhang() {
    console.log('Navigating to Theo dõi đơn hàng');
    this.router.navigate(['/theo-doi-don-hang']);
  }
}