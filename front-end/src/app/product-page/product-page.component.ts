import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Thêm Router
import { CartNotificationComponent } from '../cart-notification/cart-notification.component';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CartNotificationComponent],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  categories = [
    'Kinh doanh', 'Tiểu thuyết', 'Tâm lý', 'Kỹ năng sống', 'Văn học Việt Nam',
    'Văn học nước ngoài', 'Thiếu nhi', 'Sách học thuật', 'Sách ngoại văn', 'Trinh thám', 'Truyện tranh'
  ];
  priceRanges = [
    'Dưới 100.000 đ', 'Từ 100.000 đến 200.000 đ', 'Từ 200.000 đến 300.000 đ',
    'Từ 300.000 đến 500.000 đ', 'Từ 500.000 đ trở lên'
  ];
  countries = [
    'Việt Nam', 'Trung Quốc', 'Nhật Bản', 'Mỹ', 'Pháp', 'Anh', 'Nga', 'Canada', 'Ấn Độ', 'Brazil'
  ];
  formats = ['Bìa mềm', 'Bìa cứng'];
  ageRanges = ['Dưới 6 tuổi', 'Từ 7 đến 12 tuổi', 'Từ 13 đến 17 tuổi', 'Từ 18 tuổi trở lên'];

  selectedTags: { type: string; label: string }[] = [];
  products: any[] = [];
  originalProducts: any[] = [];
  displayedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalPages: number = 0;

  private isDragging: boolean = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router // Thêm Router vào constructor
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProduct().subscribe({
      next: (data: any[]) => {
        console.log('Dữ liệu thô từ API:', data);
        this.products = data.map(item => ({
          id: item._id,
          title: item.tensach,
          price: Number(item.gia) || 0,
          oldPrice: Number(item.giacu) || 0,
          image: item.hinhanh,
          inStock: true,
          categories: [item.theloaichinh, item.theloaiphu].filter(Boolean),
          country: item.quocgia || '',
          format: item.loaibia || '',
          ageRange: this.normalizeAgeRange(item.dotuoi) || ''
        }));
        this.originalProducts = [...this.products];
        this.updatePagination();
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu:', error);
        this.products = [
          {
            id: '67df403b4b811a9fdcea40e5',
            title: 'Những Kẻ Xuất Chúng',
            price: 150000,
            oldPrice: 250000,
            image: 'https://res.cloudinary.com/djdsteonx/image/upload/v1742676129/hinhanhsanpham/zv5x34n1zjvqiu1qbx5y.png',
            inStock: true,
            categories: ['Kỹ năng sống', 'Kinh doanh'],
            country: 'Mỹ',
            format: 'Bìa mềm',
            ageRange: 'Từ 18 tuổi trở lên'
          }
        ];
        this.originalProducts = [...this.products];
        this.updatePagination();
      }
    });
  }

  // Hàm điều hướng khi nhấp vào sản phẩm
  viewProductDetail(productId: string) {
    this.router.navigate(['/chi-tiet-san-pham', productId]);
  }

  normalizeAgeRange(age: string | undefined): string {
    if (!age) return '';
    const normalized = age.toLowerCase().trim();
    if (normalized.includes('trên 18') || normalized.includes('18+')) return 'Từ 18 tuổi trở lên';
    if (normalized.includes('13') && normalized.includes('17')) return 'Từ 13 đến 17 tuổi';
    if (normalized.includes('7') && normalized.includes('12')) return 'Từ 7 đến 12 tuổi';
    if (normalized.includes('dưới 6') || normalized.includes('0-6')) return 'Dưới 6 tuổi';
    return normalized;
  }

  scrollToTop() {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      this.scrollToTop();
    }
  }

  getPageNumbers(): (number | string)[] {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 4;

    if (this.totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= this.totalPages; i++) pageNumbers.push(i);
    } else {
      if (this.currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pageNumbers.push(1, '...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pageNumbers.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }
    return pageNumbers;
  }

  handlePageClick(page: number | string) {
    if (page !== '...') this.goToPage(page as number);
  }

  addToCart(product: any) {
    if (product.inStock) {
      const cartItem = {
        id: product.id,
        imageUrl: product.image,
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        quantity: 1
      };
      this.cartService.addToCart(cartItem);
    }
  }

  onCheckboxChange(event: Event, type: string, label: string) {
    const input = event.target as HTMLInputElement;
    this.onFilterChange(type, label, input.checked);
  }

  onSelectChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.onSortChange(select.value);
  }

  onFilterChange(type: string, label: string, checked: boolean) {
    if (checked) {
      if (!this.selectedTags.some(tag => tag.type === type && tag.label === label)) {
        this.selectedTags.push({ type, label });
      }
    } else {
      this.selectedTags = this.selectedTags.filter(tag => !(tag.type === type && tag.label === label));
    }
    this.onChange();
  }

  removeTag(tag: { type: string; label: string }) {
    this.selectedTags = this.selectedTags.filter(t => !(t.type === tag.type && t.label === tag.label));
    const inputs = document.querySelectorAll(`input[type="checkbox"]`);
    inputs.forEach((input: Element) => {
      const htmlInput = input as HTMLInputElement;
      if (htmlInput.value === tag.label) htmlInput.checked = false;
    });
    this.onChange();
  }

  clearAllTags() {
    this.selectedTags = [];
    const inputs = document.querySelectorAll(`input[type="checkbox"]`);
    inputs.forEach((input: Element) => (input as HTMLInputElement).checked = false);
    this.products = [...this.originalProducts];
    this.currentPage = 1;
    this.updatePagination();
    this.scrollToTop();
  }

  onSortChange(value: string) {
    let sortedProducts = [...this.products];
    switch (value) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
    }
    this.products = sortedProducts;
    this.currentPage = 1;
    this.updatePagination();
    this.scrollToTop();
  }

  onChange() {
    console.log('Selected tags:', this.selectedTags);
    let filteredProducts = [...this.originalProducts];

    interface Filters {
      category: string[];
      priceRange: string[];
      country: string[];
      format: string[];
      ageRange: string[];
    }

    const filters: Filters = {
      category: [],
      priceRange: [],
      country: [],
      format: [],
      ageRange: []
    };

    this.selectedTags.forEach(tag => {
      if (tag.type in filters) {
        filters[tag.type as keyof Filters].push(tag.label);
      }
    });

    if (filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        product.categories.some((cat: string) => filters.category.includes(cat))
      );
    }

    if (filters.priceRange.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const price = Number(product.price);
        return filters.priceRange.some(range => {
          switch (range) {
            case 'Dưới 100.000 đ':
              return price < 100000;
            case 'Từ 100.000 đến 200.000 đ':
              return price >= 100000 && price <= 200000;
            case 'Từ 200.000 đến 300.000 đ':
              return price > 200000 && price <= 300000;
            case 'Từ 300.000 đến 500.000 đ':
              return price > 300000 && price <= 500000;
            case 'Từ 500.000 đ trở lên':
              return price > 500000;
            default:
              return false;
          }
        });
      });
    }

    if (filters.country.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.country.includes(product.country)
      );
    }

    if (filters.format.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.format.includes(product.format)
      );
    }

    if (filters.ageRange.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        filters.ageRange.includes(product.ageRange)
      );
    }

    this.products = filteredProducts;
    this.currentPage = 1;
    this.updatePagination();
    this.scrollToTop();
  }

  startDragging(event: MouseEvent) {
    const tagContainer = document.querySelector('.tag-container') as HTMLElement;
    if (tagContainer) {
      this.isDragging = true;
      this.startX = event.pageX - tagContainer.offsetLeft;
      this.scrollLeft = tagContainer.scrollLeft;
      tagContainer.style.cursor = 'grabbing';
    }
  }

  drag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const tagContainer = document.querySelector('.tag-container') as HTMLElement;
    if (tagContainer) {
      const x = event.pageX - tagContainer.offsetLeft;
      const walk = (x - this.startX) * 2;
      tagContainer.scrollLeft = this.scrollLeft - walk;
    }
  }

  stopDragging() {
    this.isDragging = false;
    const tagContainer = document.querySelector('.tag-container') as HTMLElement;
    if (tagContainer) tagContainer.style.cursor = 'grab';
  }
}