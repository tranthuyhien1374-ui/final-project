import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupComponent } from '../services/popup.component';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-thanh-toan-chuyen-khoan',
  templateUrl: './thanh-toan-chuyen-khoan.component.html',
  styleUrls: ['./thanh-toan-chuyen-khoan.component.css'],
  standalone: true,
  imports: [CommonModule, PopupComponent]
})
export class ThanhToanChuyenKhoanComponent implements OnInit {
  orderDetails: any = {};
  selectedItems: any[] = [];
  totalAmount: number = 0;
  orderId: string = '11608';
  orderDate: string = '';
  bankDetails = {
    bankName: 'Ngân hàng ACB (Á Châu Bank)',
    accountName: 'Eden Book',
    accountNumber: '28020757',
    note: 'Họ và tên - Mã đơn hàng'
  };
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  dataMissing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.orderDate = `${day}/${month}/${year}`;

    // Lấy state trực tiếp từ history.state
    const state = history.state;
    console.log('State received in Thanh Toan Chuyen Khoan:', state);

    // Nếu state có dữ liệu, sử dụng state
    if (state?.formData) {
      this.orderDetails = state.formData;
    }
    if (state?.selectedItems) {
      this.selectedItems = state.selectedItems.map((item: any) => ({
        ...item,
        image: item.imageUrl,
        name: item.title
      }));
    }

    // Nếu state không có dữ liệu, thử lấy từ localStorage
    if (!state?.formData || !state?.selectedItems) {
      const savedFormData = localStorage.getItem('checkoutFormData');
      const savedSelectedItems = localStorage.getItem('selectedItems');

      if (savedFormData) {
        this.orderDetails = JSON.parse(savedFormData);
      }
      if (savedSelectedItems) {
        this.selectedItems = JSON.parse(savedSelectedItems).map((item: any) => ({
          ...item,
          image: item.imageUrl,
          name: item.title
        }));
      }
    }

    // Kiểm tra dữ liệu sau khi lấy từ state hoặc localStorage
    if (!this.orderDetails?.fullName || !this.orderDetails?.phoneNumber || this.selectedItems.length === 0) {
      this.dataMissing = true;
      this.showErrorPopup = true;
    }

    console.log('Order Details:', this.orderDetails);
    console.log('Selected Items in Thanh Toan Chuyen Khoan:', this.selectedItems);

    // Tính tổng tiền
    this.totalAmount = this.selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onPaymentSuccess() {
    this.showSuccessPopup = true;
    this.cartService.clearCart();
    // Xóa dữ liệu trong localStorage sau khi thanh toán thành công
    localStorage.removeItem('checkoutFormData');
    localStorage.removeItem('selectedItems');
  }

  onPaymentFailure() {
    this.router.navigate(['/thanh-toan'], {
      state: {
        formData: this.orderDetails,
        showErrorPopup: true
      }
    });
  }

  onPopupClose1() {
    this.showSuccessPopup = false;
    this.router.navigate(['/theo-doi-don-hang'])
  }
  onPopupClose2() {
    this.showErrorPopup = false;
    this.router.navigate(['/thanh-toan'], {
      state: {
        formData: this.orderDetails,
        selectedItems: this.selectedItems
      }
    });
  }

}