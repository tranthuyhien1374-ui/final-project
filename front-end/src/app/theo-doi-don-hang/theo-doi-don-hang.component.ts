import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  addressName?: string; // Tên người nhận
  addressPhone?: string; // Số điện thoại
  addressLocation?: string; // Địa chỉ
  paymentMethod?: string; // Phương thức thanh toán
  shippingFee?: number; // Phí vận chuyển
  discount?: number; // Giảm giá
  timeline?: { date: string; action: string }[]; // Lộ trình đơn hàng
  statusHistory?: { status: string; date: string }[]; // Lịch sử trạng thái
}

interface Address {
  name: string;
  phone: string;
  location: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-theo-doi-don-hang',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './theo-doi-don-hang.component.html',
  styleUrl: './theo-doi-don-hang.component.css',
  standalone: true
})
export class TheoDoiDonHangComponent implements OnInit, OnDestroy {
  private queryParamsSubscription: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute) {
      // Lắng nghe query parameters
      this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
        const section = params['section'];
        if (section) {
          this.navigateToSection(section);
        }
      });
}

  // Biến quản lý trạng thái giao diện
  selectedTab: string = 'tat-ca'; // Tab mặc định là "Tất cả"
  activeSection: string = 'theo-doi-don-hang'; // Section mặc định là "Theo dõi đơn hàng"
  dropdown: string | null = null; // Quản lý dropdown menu
  searchQuery: string = ''; // Lưu giá trị tìm kiếm
  selectedOrder: Order | null = null; // Đơn hàng được chọn để xem chi tiết
  showRatingPopup: boolean = false; // Hiển thị popup đánh giá
  ratingOrder: Order | null = null; // Đơn hàng đang được đánh giá
  currentRating: number = 0; // Số sao hiện tại (1-5)
  hoverRating: number = 0; // Số sao khi hover
  ratingText: string = ''; // Nội dung đánh giá
  showSuccessPopup: boolean = false; // Popup thông báo thành công
  showEditRatingPopup: boolean = false; // Popup sửa đánh giá
  showViewRatingPopup: boolean = false; // Popup xem đánh giá
  showCancelPopup: boolean = false; // Popup "Lý do hủy"
  showCancelSuccessPopup: boolean = false; // Popup "Hủy đơn thành công"
  cancelOrderToProcess: Order | null = null; // Đơn hàng đang được hủy
  cancelReason: string = ''; // Lý do hủy

  // Dữ liệu đơn hàng
  orders: Order[] = [];

  // Dữ liệu và logic cho trang "Hồ sơ"
  userProfile = {
    fullName: '',
    email: '',
    phone: '',
    gender: 'Nữ',
    birthDate: ''
  };

  // Dữ liệu và logic cho trang "Địa chỉ"
  userAddresses: Address[] = [
    {
      name: 'Nguyễn Ngọc Trinh',
      phone: '834 376 426 259',
      location: 'KTX Khu B ĐHQG, Đông Hòa, Thành Phố Dĩ An, Bình Dương',
      isDefault: true
    },
    {
      name: 'Nguyễn Ngọc Trinh',
      phone: '834 376 426 259',
      location: 'KTX Khu B ĐHQG, Đông Hòa, Thành Phố Dĩ An, Bình Dương',
      isDefault: false
    }
  ];

  // Dữ liệu và logic cho trang "Đổi mã PIN"
  pinData = {
    newPin: '',
    confirmPin: ''
  };

  // Dữ liệu và logic cho trang "Xóa tài khoản"
  deleteAccountConfirmation: boolean = false;

  ngOnInit() {
    this.fetchOrders();
  }
  ngOnDestroy() {
    this.queryParamsSubscription.unsubscribe();
  }
  // Giả lập lấy dữ liệu đơn hàng từ backend
  fetchOrders() {
    this.orders = [
      {
        orderId: '250301DH4CY5GYS',
        imageUrl: 'assets/images/da-vinci.jpg',
        title: 'Mật mã Da Vinci (The Da Vinci Code) (Abridged Edition)',
        quantity: 1,
        originalPrice: 300000,
        discountedPrice: 250000,
        status: 'hoan-thanh',
        totalPrice: 270000,
        confirmationDate: '2025-02-16',
        isDelivered: false,
        isRated: false,
        isEdited: false,
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
        isEdited: false,
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
      }
    ];
  }

  // Tính ngày giao dự kiến (+7 ngày từ ngày xác nhận)
  getExpectedDeliveryDate(confirmationDate: string): string {
    const date = new Date(confirmationDate);
    date.setDate(date.getDate() + 7);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Ánh xạ trạng thái đơn hàng
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
        return 'ĐƠN HÀNG ĐANG ĐƯỢC XỬ LÝ';
    }
  }

  // Ánh xạ trạng thái cho chi tiết đơn hàng
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
        return 'Đơn hàng đang được cập nhật';
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

  // Lấy ngày của một trạng thái cụ thể
  getStatusDate(order: Order, status: string): string | undefined {
    return order.statusHistory?.find(h => h.status === status)?.date;
  }

  // Xem chi tiết đơn hàng
  viewOrderDetails(order: Order) {
    this.selectedOrder = order;
    this.activeSection = 'chi-tiet-don-hang';
  }

  // Mở popup "Lý do hủy"
  openCancelPopup(order: Order) {
    if (order.status !== 'cho-xac-nhan') {
      alert('Chỉ có thể hủy đơn hàng khi đang ở trạng thái "Chờ xác nhận"!');
      return;
    }
    this.cancelOrderToProcess = order;
    this.showCancelPopup = true;
    this.cancelReason = '';
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
    }, 2000);
  }

  // Xác nhận đã nhận hàng
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
    this.currentRating = 0;
    this.hoverRating = 0;
    this.ratingText = '';
  }

  // Đóng popup đánh giá
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
      this.currentRating = 0;
    } else {
      this.currentRating = rating;
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
    if (!this.ratingOrder) {
      console.error('ratingOrder is null');
      return;
    }
    if (this.currentRating === 0) {
      alert('Vui lòng chọn số sao để đánh giá!');
      return;
    }
    this.ratingOrder.rating = this.currentRating;
    this.ratingOrder.ratingText = this.ratingText;
    this.ratingOrder.ratingDate = this.getCurrentDateTime();
    this.ratingOrder.isRated = true;
    this.ratingOrder.isEdited = false;
    console.log('Đánh giá đã được lưu:', {
      orderId: this.ratingOrder.orderId,
      rating: this.ratingOrder.rating,
      ratingText: this.ratingOrder.ratingText,
      ratingDate: this.ratingOrder.ratingDate
    });
    this.closeRatingPopup();
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 2000);
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
    this.currentRating = order.rating || 0;
    this.ratingText = order.ratingText || '';
    this.showViewRatingPopup = false;
    this.showEditRatingPopup = true;
  }

  // Hủy chỉnh sửa đánh giá và quay lại popup "Xem đánh giá"
  cancelEditRating() {
    this.showEditRatingPopup = false;
    this.showViewRatingPopup = true;
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
    this.ratingOrder.ratingDate = this.getCurrentDateTime();
    this.ratingOrder.isEdited = true;
    console.log('Đánh giá đã được cập nhật:', {
      orderId: this.ratingOrder.orderId,
      rating: this.ratingOrder.rating,
      ratingText: this.ratingOrder.ratingText,
      ratingDate: this.ratingOrder.ratingDate
    });
    this.showEditRatingPopup = false;
    this.showViewRatingPopup = true;
  }

  // Mua lại
  buyAgain(order: Order) {
    this.router.navigate([`/san-pham/${order.productId}`]);
  }

  // Chọn tab trạng thái
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  // Lọc đơn hàng theo tab và tìm kiếm
  getFilteredOrders(): Order[] {
    let filteredOrders = this.orders;
    if (this.selectedTab !== 'tat-ca') {
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
      filteredOrders = filteredOrders.filter(
        order =>
          order.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          order.orderId.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    return filteredOrders;
  }

  // Xử lý tìm kiếm
  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  // Chuyển đổi nội dung bên phải
  navigateToSection(section: string) {
    this.activeSection = section;

    const taiKhoanSections = ['ho-so', 'dia-chi', 'doi-ma-pin', 'xoa-tai-khoan'];
    const vietSachSections = ['truyen-moi', 'viet-tiep'];

    if (!taiKhoanSections.includes(section) && !vietSachSections.includes(section)) {
      this.dropdown = null;
    }

    if (section === 'theo-doi-don-hang') {
      this.selectedTab = 'tat-ca';
      this.searchQuery = '';
      this.selectedOrder = null;
    }
  }

  // Toggle dropdown menu
  toggleDropdown(menu: string) {
    this.dropdown = this.dropdown === menu ? null : menu;
  }

  // Logic cho trang "Hồ sơ"
  saveProfile() {
    if (!this.userProfile.fullName || !this.userProfile.phone) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      return;
    }
    console.log('Hồ sơ đã được lưu:', this.userProfile);
    alert('Hồ sơ đã được lưu thành công!');
  }

  // Logic cho trang "Địa chỉ"
  addNewAddress() {
    this.userAddresses.push({
      name: '',
      phone: '',
      location: '',
      isDefault: false
    });
  }

  setDefaultAddress(index: number) {
    this.userAddresses.forEach((address, i) => {
      address.isDefault = i === index;
    });
  }

  deleteAddress(index: number) {
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
      this.userAddresses.splice(index, 1);
    }
  }

  saveAddress(index: number) {
    const address = this.userAddresses[index];
    if (!address.name || !address.phone || !address.location) {
      alert('Vui lòng nhập đầy đủ thông tin địa chỉ!');
      return;
    }
    console.log('Địa chỉ đã được lưu:', address);
    alert('Địa chỉ đã được lưu thành công!');
  }

  // Logic cho trang "Đổi mã PIN"
  togglePinVisibility(field: string) {
    const input = document.getElementById(field) as HTMLInputElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  changePin() {
    if (!this.pinData.newPin || !this.pinData.confirmPin) {
      alert('Vui lòng nhập đầy đủ mã PIN mới và xác nhận mã PIN!');
      return;
    }
    if (this.pinData.newPin !== this.pinData.confirmPin) {
      alert('Mã PIN mới và xác nhận mã PIN không khớp!');
      return;
    }
    console.log('Mã PIN đã được thay đổi:', this.pinData.newPin);
    alert('Mã PIN đã được thay đổi thành công!');
    this.pinData.newPin = '';
    this.pinData.confirmPin = '';
  }

  // Logic cho trang "Xóa tài khoản"
  confirmDeleteAccount() {
    if (!this.deleteAccountConfirmation) {
      alert('Vui lòng xác nhận rằng bạn đồng ý xóa tài khoản!');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác!')) {
      console.log('Tài khoản đã được xóa');
      alert('Tài khoản đã được xóa thành công!');
      // Thêm logic để đăng xuất hoặc chuyển hướng người dùng
      this.router.navigate(['/']);
    }
  }

}