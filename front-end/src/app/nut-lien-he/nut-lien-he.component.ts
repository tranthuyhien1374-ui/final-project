import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nut-lien-he',
  imports: [CommonModule],
  templateUrl: './nut-lien-he.component.html',
  styleUrl: './nut-lien-he.component.css'
})
export class NutLienHeComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sendEmail() {
    // Mở ứng dụng email mặc định với địa chỉ email của bạn
    window.open('mailto:your-email@example.com?subject=Liên hệ từ website', '_blank');
    this.isMenuOpen = false; // Đóng menu sau khi chọn
  }

  openMessenger() {
    // Mở cửa sổ chat Messenger
    window.open('https://m.me/your-messenger-id', '_blank');
    this.isMenuOpen = false;
  }

  openZalo() {
    // Mở cửa sổ chat Zalo
    window.open('https://zalo.me/your-zalo-id', '_blank');
    this.isMenuOpen = false;
  }
}