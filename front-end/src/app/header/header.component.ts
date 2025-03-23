import { Component, HostListener, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  isVisible = true;
  private lastScrollY = 0;
  searchQuery: string = '';
  suggestions: string[] = [];
  showDropdown: boolean = false;
  private searchSubject = new Subject<string>(); // For debouncing
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;

  // Mock data for search (replace with actual data or service call)
  private mockData: string[] = [
    'Chiến Thần Bất Bại',
    'Tù Chân Giới',
    'Phương Trượng',
    'Phương Diệm Giang Sơn',
    'Phương Thu Hoài',
    'Cẩm Nang',
    'Cảm Nắng',
    'Cam Nang'
  ];

  constructor(
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Debounce search input (0.4s delay)
    this.searchSubject.pipe(debounceTime(400)).subscribe((query) => {
      this.performSearch(query);
    });

    // Restore search query if it exists (e.g., after clicking outside and back)
    const savedQuery = sessionStorage.getItem('searchQuery');
    if (savedQuery) {
      this.searchQuery = savedQuery;
    }

    // Initialize cart service
    if (this.cartService) {
      this.cartItemCount = this.cartService.getCartItemCount();
      this.cartService.cartNotification$.subscribe(item => {
        this.cartItemCount = this.cartService.getCartItemCount();
        this.cdr.markForCheck();
      });
    } else {
      console.error('CartService is not provided!');
      this.cartItemCount = 0;
    }
  }

  // Normalize the search query
  private normalizeQuery(query: string): string {
    // Trim leading/trailing spaces and reduce multiple spaces to single
    query = query.trim().replace(/\s+/g, ' ');
    // Convert to lowercase for case-insensitive search
    query = query.toLowerCase();
    return query;
  }

  // Remove accents for accent-insensitive search
  private removeAccents(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }

  // Perform search logic
  private performSearch(query: string): void {
    const normalizedQuery = this.normalizeQuery(query);
    const accentlessQuery = this.removeAccents(normalizedQuery);

    if (normalizedQuery.length < 2) {
      this.suggestions = [];
      this.showDropdown = false;
      this.cdr.markForCheck();
      return;
    }

    // Filter mock data based on the query
    this.suggestions = this.mockData
      .filter(item => {
        const accentlessItem = this.removeAccents(item.toLowerCase());
        return accentlessItem.includes(accentlessQuery);
      })
      .slice(0, 4); // Limit to 4 suggestions

    this.showDropdown = true;
    this.cdr.markForCheck();
  }

  // Handle search input
  onSearchInput(): void {
    sessionStorage.setItem('searchQuery', this.searchQuery); // Save query for persistence
    this.searchSubject.next(this.searchQuery);
  }

  // When focusing on the input
  onSearchFocus(): void {
    if (this.suggestions.length > 0) {
      this.showDropdown = true;
      this.cdr.markForCheck();
    }
  }

  // When clicking the search input
  onSearchClick(): void {
    if (this.suggestions.length > 0) {
      this.showDropdown = true;
      this.cdr.markForCheck();
    }
  }

  // When clicking the search icon
  onSearchIconClick(): void {
    this.showDropdown = true;
    this.performSearch(this.searchQuery);
    this.cdr.markForCheck();
  }

  // Navigate to product detail page
  navigateToProductDetail(suggestion: string): void {
    this.showDropdown = false;
    this.router.navigate(['/chi-tiet-san-pham'], { queryParams: { name: suggestion } });
    this.cdr.markForCheck();
  }

  navigateToSection() {
    this.router.navigate(['/theo-doi-don-hang'], { queryParams: { section:'ho-so'} });
  }
  // Handle clicking outside to hide dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.header-thanh-tim-kiem')) {
      this.showDropdown = false;
      this.cdr.markForCheck();
    }
  }

  // Handle window scroll for header visibility
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 50) {
      this.isVisible = false;
    } else if (currentScrollY < this.lastScrollY) {
      this.isVisible = true;
    }

    this.lastScrollY = currentScrollY;
    this.cdr.markForCheck();
  }

  // Other methods for the header (not related to search dropdown)
  login(): void {
    this.isLoggedIn = true;
    this.cdr.markForCheck();
  }

  onLogout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/']);
    this.cdr.markForCheck();
  }

  navigateToLogin(): void {
    this.router.navigate(['/dang-nhap']);
  }

  navigateToHome(): void {
    this.router.navigate(['/trang-chu']);
  }

  navigateToTheodoidonhang(): void {
    this.router.navigate(['/theo-doi-don-hang']);
  }

  navigateToGiohang(): void {
    this.router.navigate(['/gio-hang']);
  }

  navigateToVuonSach(): void {
    this.router.navigate(['/product-page']);
  }
}