import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';



@Component({
  selector: 'app-cart-notification',
  templateUrl: './cart-notification.component.html',
  styleUrls: ['./cart-notification.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CartNotificationComponent implements OnInit, OnDestroy {
  notifications: { cartItem: any, isVisible: boolean, timeoutId?: any }[] = [];
  private subscription: Subscription | undefined;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cartNotification$.subscribe(item => {
      if (item) {
        // Nếu có thông báo mới, ẩn tất cả thông báo hiện tại
        this.notifications.forEach(notification => {
          if (notification.isVisible) {
            notification.isVisible = false; // Kích hoạt animation trượt ra
            if (notification.timeoutId) {
              clearTimeout(notification.timeoutId); // Xóa timeout hiện tại
            }
          }
        });

        // Thêm thông báo mới vào danh sách
        const newNotification = { cartItem: item, isVisible: true };
        this.notifications.push(newNotification);
        this.startAutoHide(newNotification);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.notifications.forEach(notification => {
      if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
    });
  }

  closeNotification(notification: { cartItem: any, isVisible: boolean, timeoutId?: any }) {
    notification.isVisible = false;
    this.cartService.hideNotification();
    // Xóa thông báo khỏi danh sách sau khi animation hoàn tất (500ms)
    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n !== notification);
    }, 500);
  }

  startAutoHide(notification: { cartItem: any, isVisible: boolean, timeoutId?: any }) {
    notification.timeoutId = setTimeout(() => {
      this.closeNotification(notification);
    }, 5000);
  }

  viewCart() {
    this.router.navigate(['/gio-hang']);
    // Ẩn tất cả thông báo khi điều hướng
    this.notifications.forEach(notification => {
      notification.isVisible = false;
      if (notification.timeoutId) {
        clearTimeout(notification.timeoutId);
      }
    });
    this.notifications = [];
  }
}