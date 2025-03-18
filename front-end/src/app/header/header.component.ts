import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  imports: [FormsModule]
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

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
}
