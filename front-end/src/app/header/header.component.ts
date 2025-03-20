import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [FormsModule, RouterModule]
})
export class HeaderComponent {
  isVisible = true; // Trạng thái hiển thị header
  private lastScrollY = 0;
  searchQuery: string = '';
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
    // Logic đăng xuất sẽ được thêm sau (ví dụ: xóa token, điều hướng)
    this.router.navigate(['/']); // Quay lại trang chủ sau khi logout
  }
  // Hàm động để chuyển hướng đến trang Theo dõi đơn hàng
  navigateToTheodoidonhang() {
    console.log('Navigating to Theo dõi đơn hàng');
    this.router.navigate(['/theo-doi-don-hang']);
  }
}


