import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.css'],
  standalone: true,
  imports: [HeaderComponent]
})
export class DangNhapComponent {
  constructor(
    private router: Router,
    private cartService: CartService, // Inject CartService
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  onLogin() {
    console.log('Đăng nhập thành công');
    const header = new HeaderComponent(this.router, this.cartService, this.cdr);
    header.ngOnInit(); // Gọi thủ công ngOnInit
    header.login();
    this.router.navigate(['/']);
  }
}