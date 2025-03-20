import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { Router, RouterModule } from '@angular/router';
=======
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


>>>>>>> 8807f5c (feat them doc truyen)

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
<<<<<<< HEAD
  imports: [FormsModule, RouterModule]
=======
  imports: [FormsModule, CommonModule]
>>>>>>> 8807f5c (feat them doc truyen)
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
<<<<<<< HEAD
  // Hàm động để chuyển hướng đến trang Theo dõi đơn hàng
  navigateToTheodoidonhang() {
    console.log('Navigating to Theo dõi đơn hàng');
    this.router.navigate(['/theo-doi-don-hang']);
  }
=======

  navigateToHome(){
    this.router.navigate(['/trang-chu']);
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

>>>>>>> 8807f5c (feat them doc truyen)
}


