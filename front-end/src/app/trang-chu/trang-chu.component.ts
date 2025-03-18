import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


interface Banner {
  image: string;
}

interface FlashsaleBook {
  id: number;
  image: string;
  title: string;
  price: string;
  originalPrice: string;
}

interface Author {
  name: string;
  avatar: string;
}

interface Book {
  id: number; // Thêm id vào interface Book
  image: string;
  title: string;
  price: string;
  originalPrice: string;
}

interface Blog {
  image: string;
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-trang-chu',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit {
  banners: Banner[] = [
    { image: 'assets/banners1.png' },
    { image: 'assets/banners2.png' },
    { image: 'assets/banners3.png' }
  ];

  flashsaleBooks: FlashsaleBook[] = [
    { id: 1, image: 'assets/flashsale1.jpg', title: '100 Ý TƯỞNG BÁN HÀNG HAY NHẤT MỌI THỜI ĐẠI', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 2, image: 'assets/flashsale2.jpg', title: 'TỪ ĐIỂN 202X', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 3, image: 'assets/flashsale3.jpg', title: 'SỰ THẬT TRẦN TRỤI VỀ THÓI KÉ', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 4, image: 'assets/flashsale4.jpg', title: 'SINH NĂM 1972 - KHÁT VỌNG SỐNG CÙA KÉ DI', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 5, image: 'assets/flashsale5.jpg', title: 'TỪ DUY TỐI GIẢN HƯỚNG TỚS TỰU', price: '200.000 đ', originalPrice: '250.000 đ' }
  ];

  authors: Author[] = [
    { name: 'Nick Trenton', avatar: 'assets/author1.jpg' },
    { name: 'James West', avatar: 'assets/author2.jpg' },
    { name: 'Timothy Corrigan', avatar: 'assets/author3.jpg' },
    { name: 'Maxime Pérez', avatar: 'assets/author4.jpg' },
    { name: 'Wu Ming-Yi', avatar: 'assets/author5.jpg' }
  ];

  newBooks: Book[] = [
    { id: 1, image: 'assets/newbook1.jpg', title: 'CHUYỆN NHÀ TI (VÀ NHỮNG CHUYỆN KHÁC)', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 2, image: 'assets/newbook2.jpg', title: 'THẾ GIỚI ĐẠI HỌC BỨC CHÂN NGƯỜI', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 3, image: 'assets/newbook3.jpg', title: 'NGHI NGỜ TỪ TẾ MỚI LÀ VẾ CHÍNH ĐÁNG', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 4, image: 'assets/newbook4.jpg', title: 'TRONG VÔ VẬY CỦA NHỮNG KẺ THI NHÂN', price: '200.000 đ', originalPrice: '250.000 đ' },
    { id: 5, image: 'assets/newbook5.jpg', title: 'SẮN CÁ', price: '200.000 đ', originalPrice: '250.000 đ' }
  ];

  aboutUs = {
    title: 'VỀ CHÚNG TÔI',
    company: 'CÔNG TY TNHH SÁCH ĐỊA ĐÀNG (EDENBOOK)',
    description: 'Chào mừng bạn đến với Edenbook, nơi những con chữ hóa thành những cánh cổng dẫn lối vào một thế giới đầy tri thức, cảm xúc và sự chữa lành. Chúng tôi không chỉ là một nhà sách, mà còn là một không gian dành riêng cho những tâm hồn yêu sách từ thanh thiếu niên đến người trưởng thành (15+ tuổi), nơi bạn có thể tìm thấy sự thư thái trong từng trang giấy và khám phá những câu chuyện chạm đến trái tim. Tại Edenbook, mỗi cuốn sách đều là một mảnh ghép của Địa Đàng Tri Thức – nơi lý trí và cảm xúc giao hòa, giúp bạn mở mang tư duy, nuôi dưỡng tâm hồn và tìm thấy sự an yên giữa cuộc sống bộn bề. Hãy để chúng tôi đồng hành cùng bạn trên hành trình đọc sách đầy ý nghĩa này!'
  };

  blogs: Blog[] = [
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'Nhân chứng kể lại cuộc chiến khốc liệt tại bìa viết biên giới năm 1979', description: 'Trần tây bác sĩ Nguyễn Thị Long, người đứng đối bị thú rừng chiến khi kip đi tìm kiếm lợn rừng ở nơi đó và tiếp tục sống sót.', date: 'Thư Hai, ngày 3/3/2025' },
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'KOCHLAND - Hệ lụ tham không lồ của các ông lớn dầu mỏ', description: 'Ban đang bỏ qua một cách cực sạch có thể cải thiện vận mệnh của bạn.', date: 'Thư Hai, ngày 3/3/2025' },
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'Chuyện Hài, ngày 3/3/2025', description: 'Ban đang bỏ qua một cách cực sạch có thể cải thiện vận mệnh của bạn.', date: 'Thư Hai, ngày 3/3/2025' },
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'Thư Hài, ngày 3/3/2025', description: 'Ban đang bỏ qua một cách cực sạch có thể cải thiện vận mệnh của bạn.', date: 'Thư Hai, ngày 3/3/2025' },
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'Biết thử bút – Sách của tác giả Nobel Patrick Modiano', description: 'Ban đang bỏ qua một cách cực sạch có thể cải thiện vận mệnh của bạn.', date: 'Thư Hai, ngày 3/3/2025' },
    { image: 'https://res.cloudinary.com/dfpmnrfgs/image/upload/v1742220395/iuq0gv6gjemzkvpqyuks.png', title: 'Biết thử bút – Sách của tác giả Nobel Patrick Modiano', description: 'Ban đang bỏ qua một cách cực sạch có thể cải thiện vận mệnh của bạn.', date: 'Thư Hai, ngày 3/3/2025' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('Flashsale Books:', this.flashsaleBooks); // Log để kiểm tra dữ liệu
  }

  navigateToBookDetail(bookId: number) {
    this.router.navigate(['/chi-tiet-truyen', bookId]);
  }
}