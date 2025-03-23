import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PopupComponent } from '../services/popup.component';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PopupComponent, FormsModule]
})
export class ThanhToanComponent implements OnInit {
  selectedItems: any[] = [];
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  checkoutForm: FormGroup;
  showErrorMessage: boolean = false;
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  showSavedAddressPopup: boolean = false;
  savedAddresses: any[] = [];
  selectedAddressId: number | null = null;

  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      province: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      note: ['']
    });

    // Simulated saved addresses data
    this.savedAddresses = [
      {
        id: 1,
        fullName: 'Nguyễn Văn A',
        phoneNumber: '0123456789',
        province: '01', // Code for Hà Nội
        provinceName: 'Hà Nội',
        district: '001', // Code for Ba Đình
        districtName: 'Ba Đình',
        ward: '00004', // Cập nhật code cho Phường Trúc Bạch
        wardName: 'Phường Trúc Bạch',
        address: '123 Đường Láng'
      },
      {
        id: 2,
        fullName: 'Trần Thị B',
        phoneNumber: '0987654321',
        province: '79', // Code for TP. Hồ Chí Minh
        provinceName: 'TP. Hồ Chí Minh',
        district: '760', // Code for Quận 1
        districtName: 'Quận 1',
        ward: '27001', // Code for a ward in Quận 1
        wardName: 'Phường Bến Thành',
        address: '456 Đường Lê Lợi'
      }
    ];
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    if (state?.['formData']) {
      const formData = state['formData'];
      this.checkoutForm.patchValue(formData);
      // Fetch districts and wards based on formData
      this.fetchDistrictsForProvince(formData.province).then(() => {
        this.fetchWardsForDistrict(formData.district);
      });
    }
    if (state?.['showErrorPopup']) {
      this.showErrorPopup = true;
    }

    if (state?.['selectedItems']) {
      this.selectedItems = state['selectedItems'].map((item: any) => ({
        ...item,
        image: item.imageUrl,
        name: item.title
      }));
    } else {
      this.selectedItems = this.cartService.getSelectedItems().map((item: any) => ({
        ...item,
        image: item.imageUrl,
        name: item.title
      }));
    }

    console.log('Selected Items in Thanh Toan:', this.selectedItems);

    this.fetchProvinces();
  }

  get totalAmount() {
    return this.selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  fetchProvinces() {
    this.http.get<any>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1')
      .subscribe(response => {
        this.provinces = response.data.data;
      }, error => {
        console.error('Lỗi khi lấy danh sách tỉnh:', error);
      });
  }

  fetchDistricts(event: Event) {
    const target = event.target as HTMLSelectElement;
    const provinceCode = target.value;
    this.checkoutForm.patchValue({ province: provinceCode, district: '', ward: '' });
    this.districts = [];
    this.wards = [];

    if (!provinceCode) return;

    this.http.get<any>(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`)
      .subscribe(response => {
        this.districts = response.data?.data || [];
      }, error => {
        console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      });
  }

  fetchDistrictsForProvince(provinceCode: string): Promise<void> {
    if (!provinceCode) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${provinceCode}&limit=-1`)
        .subscribe(response => {
          this.districts = response.data?.data || [];
          resolve();
        }, error => {
          console.error('Lỗi khi lấy danh sách quận/huyện:', error);
          reject(error);
        });
    });
  }

  fetchWards(event: Event) {
    const target = event.target as HTMLSelectElement;
    const districtCode = target.value;
    this.checkoutForm.patchValue({ district: districtCode, ward: '' });
    this.wards = [];

    if (!districtCode) return;

    this.http.get<any>(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`)
      .subscribe(response => {
        this.wards = response.data?.data || [];
      }, error => {
        console.error('Lỗi khi lấy danh sách phường/xã:', error);
      });
  }

  fetchWardsForDistrict(districtCode: string): Promise<void> {
    if (!districtCode) return Promise.resolve();
    return new Promise((resolve, reject) => {
      this.http.get<any>(`https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=${districtCode}&limit=-1`)
        .subscribe(response => {
          this.wards = response.data?.data || [];
          resolve();
        }, error => {
          console.error('Lỗi khi lấy danh sách phường/xã:', error);
          reject(error);
        });
    });
  }

  onWardChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.checkoutForm.patchValue({ ward: target.value });
  }

  openSavedAddressPopup() {
    this.showSavedAddressPopup = true;
    this.selectedAddressId = null;
  }

  closeSavedAddressPopup() {
    this.showSavedAddressPopup = false;
  }

  confirmSavedAddress() {
    if (this.selectedAddressId !== null) {
      const selectedAddress = this.savedAddresses.find(addr => addr.id === this.selectedAddressId);
      if (selectedAddress) {
        // Reset districts and wards before fetching new data
        this.districts = [];
        this.wards = [];

        // Ensure provinces are loaded before proceeding
        if (!this.provinces.length) {
          this.fetchProvinces();
        }

        // Fetch districts and wards sequentially, then update the form
        this.fetchDistrictsForProvince(selectedAddress.province)
          .then(() => this.fetchWardsForDistrict(selectedAddress.district))
          .then(() => {
            // Update the form after districts and wards are fetched
            this.checkoutForm.patchValue({
              fullName: selectedAddress.fullName,
              phoneNumber: selectedAddress.phoneNumber,
              province: selectedAddress.province,
              district: selectedAddress.district,
              ward: selectedAddress.ward,
              address: selectedAddress.address
            });
          })
          .catch(error => {
            console.error('Error fetching districts or wards:', error);
          });
      }
    }
    this.showSavedAddressPopup = false;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.showErrorMessage = false;
      const paymentMethod = this.checkoutForm.get('paymentMethod')?.value;
      console.log('Form Data before navigation:', this.checkoutForm.value);
      console.log('Selected Items before navigation:', this.selectedItems);

      if (!this.selectedItems || this.selectedItems.length === 0) {
        alert('Không có sản phẩm nào được chọn để thanh toán!');
        return;
      }

      const currentAddress = {
        fullName: this.checkoutForm.get('fullName')?.value.toLowerCase(),
        phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
        province: this.checkoutForm.get('province')?.value,
        district: this.checkoutForm.get('district')?.value,
        ward: this.checkoutForm.get('ward')?.value,
        address: this.checkoutForm.get('address')?.value.toLowerCase()
      };

      const isNewAddress = !this.savedAddresses.some(addr =>
        addr.fullName.toLowerCase() === currentAddress.fullName &&
        addr.phoneNumber === currentAddress.phoneNumber &&
        addr.province === currentAddress.province &&
        addr.district === currentAddress.district &&
        addr.ward === currentAddress.ward &&
        addr.address.toLowerCase() === currentAddress.address
      );

      if (isNewAddress) {
        const provinceName = this.provinces.find(p => p.code === currentAddress.province)?.name || '';
        const districtName = this.districts.find(d => d.code === currentAddress.district)?.name || '';
        const wardName = this.wards.find(w => w.code === currentAddress.ward)?.name || '';

        this.savedAddresses.push({
          id: this.savedAddresses.length + 1,
          fullName: this.checkoutForm.get('fullName')?.value,
          phoneNumber: this.checkoutForm.get('phoneNumber')?.value,
          province: currentAddress.province,
          provinceName: provinceName,
          district: currentAddress.district,
          districtName: districtName,
          ward: currentAddress.ward,
          wardName: wardName,
          address: this.checkoutForm.get('address')?.value
        });
        console.log('New address added:', this.savedAddresses);
      }

      localStorage.setItem('checkoutFormData', JSON.stringify(this.checkoutForm.value));
      localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));

      if (paymentMethod === 'bank') {
        this.router.navigate(['/thanh-toan-chuyen-khoan'], {
          state: { 
            formData: this.checkoutForm.value,
            selectedItems: this.selectedItems
          }
        });
      } else if (paymentMethod === 'cod') {
        this.showSuccessPopup = true;
        this.cartService.clearCart();
        localStorage.removeItem('checkoutFormData');
        localStorage.removeItem('selectedItems');
      }
    } else {
      this.showErrorMessage = true;
      this.checkoutForm.markAllAsTouched();
    }
  }

  onPopupClose() {
    this.showSuccessPopup = false;
    this.showErrorPopup = false;
    this.router.navigate(['/theo-doi-don-hang']);
  }

  get fullName() { return this.checkoutForm.get('fullName') as FormControl; }
  get phoneNumber() { return this.checkoutForm.get('phoneNumber') as FormControl; }
  get province() { return this.checkoutForm.get('province') as FormControl; }
  get district() { return this.checkoutForm.get('district') as FormControl; }
  get ward() { return this.checkoutForm.get('ward') as FormControl; }
  get address() { return this.checkoutForm.get('address') as FormControl; }
  get paymentMethod() { return this.checkoutForm.get('paymentMethod') as FormControl; }
}