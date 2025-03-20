import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.css'],
  standalone: true
})
export class DangNhapComponent {
  constructor(private router: Router) {}

  onLogin() {
    // Giả lập đăng nhập thành công
    console.log('Đăng nhập thành công');
    // Cập nhật trạng thái đăng nhập trong HeaderComponent
    const header = new HeaderComponent(this.router);
    header.login();
    // Điều hướng về trang chủ
    this.router.navigate(['/']);
  }
}