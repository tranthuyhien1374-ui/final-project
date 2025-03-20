import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Order {
  orderId: string; // Mã đơn hàng duy nhất
  imageUrl: string;
  title: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  status: string; // Trạng thái: "Chờ xác nhận", "Vận chuyển", "Chờ giao hàng", "Hoàn thành", "Đã hủy"
  totalPrice: number;
  confirmationDate?: string; // Ngày xác nhận (dùng để tính ngày giao dự kiến)
  isDelivered: boolean; // Giả định trạng thái đã giao (cho admin cập nhật)
  isRated: boolean; // Giả định trạng thái đã đánh giá
  isEdited?: boolean; // Thêm trường để theo dõi trạng thái chỉnh sửa
  productId?: string; // ID sản phẩm để điều hướng khi "Mua lại"
  rating?: number; // Số sao (1-5)
  ratingText?: string; // Nội dung đánh giá
  ratingDate?: string; // Ngày đánh giá
  // Thêm các trường cho chi tiết đơn hàng
  addressName?: string; // Corrected property name
  addressPhone?: string;
  addressLocation?: string;
  paymentMethod?: string; // Phương thức thanh toán
  shippingFee?: number; // Phí vận chuyển
  discount?: number; // Giảm giá
  timeline?: { date: string; action: string }[]; // Lộ trình đơn hàng
  statusHistory?: { status: string; date: string }[]; // Lịch sử trạng thái
}

@Component({
  selector: 'app-theo-doi-don-hang',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './theo-doi-don-hang.component.html',
  styleUrl: './theo-doi-don-hang.component.css',
  standalone: true
})
export class TheoDoiDonHangComponent implements OnInit {
  constructor(private router: Router) {}
  selectedTab: string = 'tat-ca'; // Giá trị mặc định là "Tất cả"
  activeSection: string = 'theo-doi-don-hang'; // Giá trị mặc định là "Theo dõi đơn hàng"
  orders: Order[] = []; // Danh sách đơn hàng
  searchQuery: string = '';// Thêm biến để lưu giá trị tìm kiếm
  dropdown: string | null = null; // Thêm biến để quản lý dropdown
  selectedOrder: Order | null = null; // Lưu đơn hàng được chọn để xem chi tiết
  showRatingPopup: boolean = false; // Quản lý hiển thị popup
  ratingOrder: Order | null = null; // Đơn hàng đang được đánh giá
  currentRating: number = 0; // Số sao hiện tại (1-5)
  hoverRating: number = 0; // Số sao khi hover
  ratingText: string = ''; // Nội dung đánh giá
  showSuccessPopup: boolean = false; // Thêm biến để quản lý popup thông báo
  showEditRatingPopup: boolean = false; // Thêm biến để quản lý popup sửa đánh giá
  showViewRatingPopup: boolean = false; // Thêm biến để quản lý popup xem đánh giá
  showCancelPopup: boolean = false; // Thêm biến để quản lý popup "Lý do hủy"
  showCancelSuccessPopup: boolean = false; // Thêm biến để quản lý popup "Hủy đơn thành công"
  cancelOrderToProcess: Order | null = null; // Lưu đơn hàng đang được hủy
  cancelReason: string = ''; // Lưu lý do hủy

  // Thêm phương thức để ánh xạ trạng thái cho chi tiết đơn hàng
  getDetailedStatus(status: string): string {
    switch (status) {
      case 'cho-xac-nhan':
        return 'Đang xác nhận đơn hàng';
      case 'van-chuyen':
        return 'Đơn hàng đang được giao';
      case 'cho-giao-hang':
        return 'Đơn hàng đang được giao';
      case 'hoan-thanh':
        return 'Đơn hàng đã hoàn thành';
      case 'da-huy':
        return 'Đơn hàng đã bị hủy';
        default:
          return 'Đơn hàng đang được cập nhật'; // Default return statement
    }
  }

  //Ánh xạ cho trạng thái đơn hàng
  getDisplayStatus(status: string): string {
    switch (status) {
      case 'cho-xac-nhan':
        return 'CHỜ XÁC NHẬN';
      case 'van-chuyen':
        return 'VẬN CHUYỂN';
      case 'cho-giao-hang':
        return 'CHỜ GIAO HÀNG';
      case 'hoan-thanh':
        return 'HOÀN THÀNH';
      case 'da-huy':
        return 'ĐÃ HỦY';
      default:
        return "ĐƠN HÀNG ĐANG ĐƯỢC XỬ LÝ"; // Nếu không khớp, trả về giá trị in hoa mặc định
    }
  }
  // Kiểm tra xem trạng thái hiện tại đã đạt được trạng thái đích đến chưa
  isStatusReached(order: Order, status: string): boolean {
    const statusOrder = [
      'Đơn hàng đã được đặt thành công',
      'Đã xác nhận đơn hàng',
      'Đã giao cho đơn vị vận chuyển',
      'Đã nhận được hàng',
      'Đánh giá'
    ];
    const currentStatusIndex = statusOrder.indexOf(this.getDetailedStatus(order.status));
    const targetStatusIndex = statusOrder.indexOf(status);
    return currentStatusIndex >= targetStatusIndex;
  }

  // chi tiết đơn hàng
viewOrderDetails(order: Order) {
  this.selectedOrder = order;
  this.activeSection = 'chi-tiet-don-hang';
}

// Method to get the date of a specific status
getStatusDate(order: Order, status: string): string | undefined {
  return order.statusHistory?.find(h => h.status === status)?.date;
}

  ngOnInit(){
    this.fetchOrders();
  }

  // Giả lập lấy dữ liệu từ backend
  fetchOrders() {
    this.orders = [
      {
        orderId: '250301DH4CY5GYS',
        imageUrl: 'assets/images/da-vinci.jpg',
        title: 'Mật mã Da Vinci (The Da Vinci Code) (Abridged Edition)',
        quantity: 1,
        originalPrice: 300000,
        discountedPrice: 250000,
        status: 'hoan-thanh', // Thay đổi trạng thái để kiểm tra
        totalPrice: 270000,
        confirmationDate: '2025-02-16',
        isDelivered: false,
        isRated: false,
        isEdited: false, // Khởi tạo isEdited
        productId: 'product-123',
        addressName: 'Nguyễn Ngọc Trinh',
        addressPhone: '123456789',
        addressLocation: 'KTX Khu B, ĐH. An Bình, Dương',
        paymentMethod: 'Chuyển khoản ngân hàng',
        shippingFee: 20000,
        discount: 0,
        timeline: [
          { date: '09:25 01/03/2025', action: 'Đã nhận được hàng' },
          { date: '15:20 20/02/2025', action: 'Đã giao cho đơn vị vận chuyển' },
          { date: '15:52 17/02/2025', action: 'Đang chuẩn bị đơn hàng' },
          { date: '14:02 16/02/2025', action: 'Đơn hàng đã được đặt thành công' }
        ],
        statusHistory: [
          { status: 'Đã nhận được hàng', date: '09:25 01/03/2025' },
          { status: 'Đã giao cho đơn vị vận chuyển', date: '15:20 20/02/2025' },
          { status: 'Đang chuẩn bị đơn hàng', date: '15:52 17/02/2025' },
          { status: 'Đơn hàng đã được đặt thành công', date: '14:02 16/02/2025' }
        ]
      },
      {
        orderId: '250302DH4CY5GYS',
        imageUrl: 'assets/images/nhung-ke-xuat-chung.jpg',
        title: 'Những kẻ xuất chúng',
        quantity: 1,
        originalPrice: 200000,
        discountedPrice: 150000,
        status: 'cho-xac-nhan',
        totalPrice: 165000,
        confirmationDate: '2025-02-16',
        isDelivered: false,
        isRated: false,
        isEdited: false, // Khởi tạo isEdited
        productId: 'product-124',
        addressName: 'Nguyễn Ngọc Trinh',
        addressPhone: '123456789',
        addressLocation: 'KTX Khu B, ĐH. An Bình, Dương',
        paymentMethod: 'Chuyển khoản ngân hàng',
        shippingFee: 15000,
        discount: 0,
        timeline: [
          { date: '15:15 20/02/2025', action: 'Đã giao cho đơn vị vận chuyển' },
          { date: '15:52 17/02/2025', action: 'Đang chuẩn bị đơn hàng' },
          { date: '14:02 16/02/2025', action: 'Đơn hàng đã được đặt thành công' }
        ],
        statusHistory: [
          { status: 'Đã giao cho đơn vị vận chuyển', date: '15:15 20/02/2025' },
          { status: 'Đang chuẩn bị đơn hàng', date: '15:52 17/02/2025' },
          { status: 'Đơn hàng đã được đặt thành công', date: '14:02 16/02/2025' }
        ]
      },
    ];
  }

  // Tính ngày giao dự kiến (+7 ngày từ ngày xác nhận)
  getExpectedDeliveryDate(confirmationDate: string): string {
    const date = new Date(confirmationDate);
    date.setDate(date.getDate() + 7);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Mở popup "Lý do hủy"
  openCancelPopup(order: Order) {
    if (order.status !== 'cho-xac-nhan') {
      alert('Chỉ có thể hủy đơn hàng khi đang ở trạng thái "Chờ xác nhận"!');
      return;
    }
    this.cancelOrderToProcess = order;
    this.showCancelPopup = true;
    this.cancelReason = ''; // Reset lý do hủy
  }

  // Đóng popup "Lý do hủy"
  closeCancelPopup() {
    this.showCancelPopup = false;
    this.cancelReason = '';
  }

  // Xác nhận hủy đơn hàng
  confirmCancelOrder() {
    if (!this.cancelOrderToProcess) return;
    if (!this.cancelReason) {
      alert('Vui lòng chọn lý do hủy đơn hàng!');
      return;
    }
    this.cancelOrderToProcess.status = 'da-huy';
    console.log('Đơn hàng đã được hủy:', {
      orderId: this.cancelOrderToProcess.orderId,
      cancelReason: this.cancelReason
    });
    this.closeCancelPopup();
    this.showCancelSuccessPopup = true;
    setTimeout(() => {
      this.showCancelSuccessPopup = false;
      this.cancelOrderToProcess = null;
    }, 2000); // Tự động đóng sau 2 giây
  }

  // Đã nhận hàng
  confirmReceived(order: Order) {
    if (order.isDelivered && confirm('Xác nhận đã nhận hàng?')) {
      order.status = 'hoan-thanh';
    } else {
      alert('Chưa được giao hàng!');
    }
  }

  // Mở popup đánh giá
  openRatingPopup(order: Order) {
    this.ratingOrder = order;
    this.showRatingPopup = true;
    this.currentRating = 0; // Reset số sao
    this.hoverRating = 0; // Reset hover
    this.ratingText = ''; // Reset nội dung đánh giá
  }

  // Đóng popup
  closeRatingPopup() {
    this.showRatingPopup = false;
    this.showEditRatingPopup = false;
    this.ratingOrder = null;
    this.currentRating = 0;
    this.hoverRating = 0;
    this.ratingText = '';
  }

  // Hover vào sao
  onStarHover(rating: number) {
    this.hoverRating = rating;
  }

  // Rời hover
  onStarLeave() {
    this.hoverRating = 0;
  }

  // Click vào sao
  onStarClick(rating: number) {
    if (this.currentRating === rating) {
      this.currentRating = 0; // Bỏ chọn nếu click lại vào cùng sao
    } else {
      this.currentRating = rating; // Chọn số sao
    }
  }

  // Lấy text mô tả dựa trên số sao
  getRatingText(rating: number): string {
    switch (rating) {
      case 1:
        return 'Tệ';
      case 2:
        return 'Không tốt';
      case 3:
        return 'Bình thường';
      case 4:
        return 'Tốt';
      case 5:
        return 'Tuyệt vời';
      default:
        return '';
    }
  }
// Lấy thời gian hiện tại dưới dạng chuỗi
getCurrentDateTime(): string {
  const now = new Date();
  return `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
}
  // Gửi đánh giá
  submitRating() {
    // if (!this.ratingOrder) return;
    // if (this.currentRating === 0) {
    //   alert('Vui lòng chọn số sao để đánh giá!');
    //   return;
    // }
    console.log('submitRating called'); // Debug
  if (!this.ratingOrder) {
    console.error('ratingOrder is null'); // Debug
    return;
  }
  if (this.currentRating === 0) {
    console.log('No rating selected'); // Debug
    alert('Vui lòng chọn số sao để đánh giá!');
    return;
  }
    this.ratingOrder.rating = this.currentRating;
    this.ratingOrder.ratingText = this.ratingText;
    this.ratingOrder.ratingDate = this.getCurrentDateTime(); // Lưu thời gian đánh giá
    this.ratingOrder.isRated = true;
    this.ratingOrder.isEdited = false; // Khởi tạo isEdited
    console.log('Đánh giá đã được lưu:', {
      orderId: this.ratingOrder.orderId,
      rating: this.ratingOrder.rating,
      ratingText: this.ratingOrder.ratingText,
      ratingDate: this.ratingOrder.ratingDate
    });
    this.closeRatingPopup();
    // Hiển thị popup thông báo
  console.log('Showing success popup'); // Debug
  this.showSuccessPopup = true;
  setTimeout(() => {
    console.log('Hiding success popup'); // Debug
    this.showSuccessPopup = false;
  }, 2000); // Tự động đóng sau 2 giây
}

  // Mở popup xem đánh giá
  viewRating(order: Order) {
    this.ratingOrder = order;
    this.showViewRatingPopup = true;
  }

  // Đóng popup xem đánh giá
  closeViewRatingPopup() {
    this.showViewRatingPopup = false;
    this.ratingOrder = null;
  }

  // Mở popup sửa đánh giá
  openEditRatingPopup(order: Order) {
    this.ratingOrder = order;
    this.currentRating = order.rating || 0; // Hiển thị số sao cũ
    this.ratingText = order.ratingText || ''; // Hiển thị nội dung cũ
    this.showViewRatingPopup = false; // Đóng popup xem đánh giá
    this.showEditRatingPopup = true; // Mở popup sửa đánh giá
  }
  // Hủy chỉnh sửa đánh giá và quay lại popup "Xem đánh giá"
cancelEditRating() {
  this.showEditRatingPopup = false; // Đóng popup "Sửa đánh giá"
  this.showViewRatingPopup = true; // Mở lại popup "Xem đánh giá"
  // Không reset dữ liệu để giữ nguyên thông tin
}
  // Cập nhật đánh giá
  updateRating() {
    if (!this.ratingOrder) return;
    if (this.currentRating === 0) {
      alert('Vui lòng chọn số sao để đánh giá!');
      return;
    }
    this.ratingOrder.rating = this.currentRating;
    this.ratingOrder.ratingText = this.ratingText;
    this.ratingOrder.ratingDate = this.getCurrentDateTime(); // Cập nhật thời gian
    this.ratingOrder.isEdited = true; // Đánh dấu đã chỉnh sửa
    console.log('Đánh giá đã được cập nhật:', {
      orderId: this.ratingOrder.orderId,
      rating: this.ratingOrder.rating,
      ratingText: this.ratingOrder.ratingText,
      ratingDate: this.ratingOrder.ratingDate
    });
    this.showEditRatingPopup = false; // Đóng popup sửa
    this.showViewRatingPopup = true; // Mở lại popup xem đánh giá
  }

  // Mua lại
  buyAgain(order: Order) {
    this.router.navigate([`/san-pham/${order.productId}`]);
  }
  // Liên hệ
  navigateToLienHe(orderId?: string) {
    if (orderId) {
      // Nếu cần truyền orderId, có thể dùng queryParams
      this.router.navigate(['/lien-he'], { queryParams: { orderId: orderId } });
    } else {
      this.router.navigate(['/lien-he']);
    }
  }
  // Chọn tab trạng thái
  selectTab(tab: string) {
    this.selectedTab = tab; // Cập nhật tab được chọn
  }

  // Chuyển đổi nội dung bên phải
  navigateToSection(section: string) {
    this.activeSection = section;

    // Danh sách các section thuộc "Tài khoản của tôi"
    const taiKhoanSections = ['ho-so', 'dia-chi', 'doi-ma-pin', 'xoa-tai-khoan'];
    // Danh sách các section thuộc "Viết sách/truyện"
    const vietSachSections = ['truyen-moi', 'viet-tiep'];

    // Chỉ đóng dropdown nếu section không thuộc "Tài khoản của tôi" hoặc "Viết sách/truyện"
    if (!taiKhoanSections.includes(section) && !vietSachSections.includes(section)) {
      this.dropdown = null; // Đóng dropdown khi chuyển sang section khác
    }

    if (section === 'theo-doi-don-hang') {
      this.selectedTab = 'tat-ca'; // Reset tab khi quay lại Theo dõi đơn hàng
      this.searchQuery = ''; // Reset tìm kiếm khi quay lại
      this.selectedOrder = null; // Reset chi tiết đơn hàng khi quay lại
    }
  }
  // Toggle dropdown menu
  toggleDropdown(menu: string) {
    console.log('Toggle dropdown:', menu, 'Current dropdown:', this.dropdown); // Debug
    this.dropdown = this.dropdown === menu ? null : menu; // Toggle dropdown
  }

  // Lọc đơn hàng theo tab và tìm kiếm
getFilteredOrders(): Order[] {
  let filteredOrders = this.orders;
  if (this.selectedTab !== 'tat-ca') {
    // Ánh xạ giá trị selectedTab sang status của đơn hàng
    let status: string;
    switch (this.selectedTab) {
      case 'cho-xac-nhan':
        status = 'Chờ xác nhận';
        break;
      case 'van-chuyen':
        status = 'Vận chuyển';
        break;
      case 'cho-giao-hang':
        status = 'Chờ giao hàng';
        break;
      case 'hoan-thanh':
        status = 'Hoàn thành';
        break;
      case 'da-huy':
        status = 'Đã hủy';
        break;
      default:
        status = this.selectedTab;
    }
    filteredOrders = filteredOrders.filter(order => order.status === this.selectedTab);
  }
  if (this.searchQuery.trim()) {
    filteredOrders = filteredOrders.filter(order =>
      order.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  return filteredOrders;
}
onSearchInput(event: Event) {
  const input = event.target as HTMLInputElement;
  this.searchQuery = input.value; // Cập nhật searchQuery khi gõ
}
}

