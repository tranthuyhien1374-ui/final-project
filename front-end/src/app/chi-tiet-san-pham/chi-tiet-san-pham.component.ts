import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; // Thêm ActivatedRoute
import { CartNotificationComponent } from '../cart-notification/cart-notification.component';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service'; // Thêm ProductService

interface Product {
  imageUrl: string;
  title: string;
  author: string;
  price: number;
  oldPrice: number;
  description: string;
  publisher: string;
  size: string;
  pages: number;
  releaseDate: string;
  maincategory: string;
  subcategory: string;
  inStock: boolean;
}

interface Work {
  title: string;
  image: string;
}

interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-chi-tiet-san-pham',
  templateUrl: './chi-tiet-san-pham.component.html',
  styleUrls: ['./chi-tiet-san-pham.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, CartNotificationComponent]
})
export class ChiTietSanPhamComponent implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  works: Work[] = [];
  reviews: Review[] = [];
  displayedReviews: Review[] = [];
  initialDisplayCount: number = 3;
  additionalDisplayCount: number = 5;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute, // Thêm ActivatedRoute
    private productService: ProductService // Thêm ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Lấy ID từ route
    if (productId) {
      this.fetchProductDetail(productId);
    }

    // Dữ liệu mẫu cho works và reviews
    this.works = [
      { title: "Chuyện Nhà Tí Và Nhiều Chuyện Nhà Khác", image: "assets/images/chuyen-nha-ti-va-nhieu-chuyen-nha-khac.jpg" },
      { title: "Thế Giới Đại Hơn Bước Chân Người", image: "assets/images/the-gioi-dai-hon-buoc-chan-nguoi.jpg" },
      { title: "Nghi Ngơi Tử Mới Là Việc Chính Đáng", image: "assets/images/nghi-ngoi-tu-moi-la-viec-chinh-dang.jpg" },
      { title: "Trong Vòng Vây Của Những Kẻ Thành Nhân", image: "assets/images/trong-vong-vay-cua-nhung-ke-thanh-nhan.jpg" },
      { title: "Trong Vòng Vây Của Những Kẻ Thành Nhân", image: "assets/images/trong-vong-vay-cua-nhung-ke-thanh-nhan.jpg" },
    ];

    this.reviews = [
      { username: "nguyengocbinh", rating: 5, comment: "Đồng gói đẹp, chính chủ. Sách hay", date: "07-03-2025" },
      { username: "nguyenvanA", rating: 4, comment: "Sách rất hay, nội dung sâu sắc, nhưng giao hàng hơi chậm.", date: "06-03-2025" },
      { username: "tranvanB", rating: 5, comment: "Tuyệt vời! Một cuốn sách đáng đọc.", date: "05-03-2025" },
      { username: "lethiC", rating: 3, comment: "Nội dung ổn, nhưng bìa sách hơi bị rách.", date: "04-03-2025" }
    ];

    this.displayedReviews = this.reviews.slice(0, this.initialDisplayCount);
  }

  fetchProductDetail(productId: string) {
    this.productService.getProduct().subscribe({
      next: (data: any[]) => {
        const productData = data.find(item => item._id === productId);
        if (productData) {
          this.product = {
            imageUrl: productData.hinhanh,
            title: productData.tensach,
            author: productData.tacgia || 'Không xác định', // Thêm trường tác giả nếu API có
            price: Number(productData.gia) || 0,
            oldPrice: Number(productData.giacu) || 0,
            description: productData.mota || 'Không có mô tả', // Thêm mô tả nếu API có
            publisher: productData.nhaxuatban || 'Không xác định', // Thêm NXB nếu API có
            size: productData.kichthuoc || 'Không xác định',
            pages: productData.sotrang || 0,
            releaseDate: productData.ngayphathanh || 'Không xác định',
            maincategory: productData.theloaichinh || '',
            subcategory: productData.theloaiphu || '',
            inStock: true
          };
        } else {
          console.error('Không tìm thấy sản phẩm với ID:', productId);
          this.loadFallbackProduct();
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
        this.loadFallbackProduct();
      }
    });
  }

  loadFallbackProduct() {
    this.product = {
      imageUrl: 'assets/images/sinh-nam-1972.jpg',
      title: 'Sinh Năm 1972 - Khát Vọng Sống Của Kẻ Đi Ngược',
      author: 'Nguyễn Cảnh Bình',
      price: 200000,
      oldPrice: 250000,
      description: 'Bối cảnh là Hà Nội những ngày gay cấn quyết định vận mệnh đất nước...',
      publisher: 'Alpha Books',
      size: '14 x 20.5 cm',
      pages: 215,
      releaseDate: '2015',
      maincategory: 'Sách văn học',
      subcategory: 'Tiểu thuyết',
      inStock: true
    };
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product && this.product.inStock) {
      const cartItem = {
        id: Date.now(),
        imageUrl: this.product.imageUrl,
        title: this.product.title,
        price: this.product.price,
        oldPrice: this.product.oldPrice,
        quantity: this.quantity,
        author: this.product.author,
        selected: false
      };
      this.cartService.addToCart(cartItem);
    }
  }

  buyNow() {
    if (this.product) {
      console.log("Mua ngay", this.quantity, "sản phẩm", this.product.title);
    }
  }

  showMoreReviews() {
    const currentCount = this.displayedReviews.length;
    const nextCount = Math.min(currentCount + this.additionalDisplayCount, this.reviews.length);
    this.displayedReviews = this.reviews.slice(0, nextCount);
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0).map((_, i) => i + 1);
  }
}