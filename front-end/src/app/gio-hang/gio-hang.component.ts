import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class GioHangComponent implements OnInit, OnDestroy {
  cartItems: any[] = [];
  searchQuery: string = '';
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.searchProducts();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item, item.quantity);
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item, item.quantity);
    }
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.searchProducts();
  }

  removeSelectedItems() {
    this.cartService.removeSelectedItems();
    this.searchProducts();
  }

  selectAll(event: any) {
    const checked = event.target.checked;
    this.cartItems.forEach(item => {
      item.selected = checked;
      this.cartService.updateSelected(item, checked);
    });
  }

  get totalAmount() {
    return this.cartService.getSelectedItems()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  navigatetoThanhToan() {
    const selectedItems = this.cartService.getSelectedItems();
    if (selectedItems.length === 0) {
      alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }
    this.router.navigate(['/thanh-toan'], {
      state: { selectedItems: selectedItems }
    });
  }

  searchProducts() {
    if (this.searchQuery.trim() === '') {
      this.cartItems = this.cartService.getCartItems();
    } else {
      this.cartItems = this.cartService.getCartItems().filter(item =>
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }
  }
}