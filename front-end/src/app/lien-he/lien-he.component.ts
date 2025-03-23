import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NutLienHeComponent } from '../nut-lien-he/nut-lien-he.component';

interface Contact {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

@Component({
  selector: 'app-lien-he',
  standalone: true,
  imports: [CommonModule, FormsModule, NutLienHeComponent],
  templateUrl: './lien-he.component.html',
  styleUrls: ['./lien-he.component.css']
})
export class LienHeComponent {
  // Thông tin liên hệ
  officeAddress = '669 Đỗ Mười, Phường Linh Xuấn, TP. Thủ Đức, TP. Hồ Chí Minh';
  email = 'edenbook@gmail.com';
  phone = '039 349 4057';
  googleMapsLink = 'https://maps.app.goo.gl/nusjwiKuiXToN8bb6';

  // Form data
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  // Danh sách liên hệ (giả lập CSDL)
  contacts: Contact[] = [];

  // Trạng thái hiển thị thông báo
  showSuccessPopup: boolean = false;

  // Gửi liên hệ
  submitContact() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.phone || !this.contactForm.message) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const contact: Contact = {
      name: this.contactForm.name,
      email: this.contactForm.email,
      phone: this.contactForm.phone,
      message: this.contactForm.message,
      submittedAt: this.getCurrentDateTime()
    };

    // Lưu vào CSDL (giả lập)
    this.contacts.push(contact);
    console.log('Danh sách liên hệ:', this.contacts);

    // Hiển thị thông báo thành công
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 3000);

    // Reset form
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }

  // Lấy thời gian hiện tại
  getCurrentDateTime(): string {
    const now = new Date();
    return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }
}