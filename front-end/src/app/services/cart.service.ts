import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  imageUrl: string;
  title: string;
  price: number;
  oldPrice: number;
  quantity: number;
  selected?: boolean;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartNotificationSubject = new BehaviorSubject<CartItem | null>(null);
  cartNotification$ = this.cartNotificationSubject.asObservable();

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartItems: CartItem[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item, selected: false });
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
    this.cartNotificationSubject.next(item);
  }

  hideNotification() {
    this.cartNotificationSubject.next(null);
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getSelectedItems(): CartItem[] {
    return this.cartItems.filter(item => item.selected);
  }

  updateQuantity(item: CartItem, quantity: number) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (cartItem.quantity <= 0) {
        this.removeFromCart(cartItem);
      } else {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        this.cartItemsSubject.next(this.cartItems);
      }
    }
  }

  updateSelected(item: CartItem, selected: boolean) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      cartItem.selected = selected;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  removeSelectedItems() {
    this.cartItems = this.cartItems.filter(item => !item.selected);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }
}