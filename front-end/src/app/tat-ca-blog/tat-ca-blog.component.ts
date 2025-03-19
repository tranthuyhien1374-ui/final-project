import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

interface Blog {
  title: string;
  date: string;
  image: string;
  link: string;
}

interface Category {
  title: string;
  date: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-tat-ca-blog',
  templateUrl: './tat-ca-blog.component.html',
  styleUrls: ['./tat-ca-blog.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TatCaBlogComponent {
  blogs: Blog[] = [
    {
      title: "Tên cứ đóa hống: Không thành kiến thực về trí tuệ",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/3-155d7431-57ee-45f8-89e7-ca2611f2dba2.png?v=1740455001480",
      link: "/ten-cu-doa-hong"
    },
    {
      title: "Bận đang bổ quả mứt cuốn sách hay về nhàn chỉnh học",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-13-b20321b5-569d-4b12-b0c7-2464ac4eef40.png?v=1740389662927",
      link: "/ban-dang-bo-qua"
    },
    {
      title: "Chuyện Hưa Tam Quang bắt mậu - Người bình dân",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-9.png?v=1740389257587",
      link: "/chuyen-hua-tam-quang"
    },
    {
      title: "Nguyễn Hữu Tam Quang bắt mậu - Trung Quốc bình dân",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-8-1ee4bcfb-f690-430b-b9ad-e68d852b7886.png?v=1740388337033",
      link: "/nguyen-huu-tam-quang"
    },
    {
      title: "Bận đang bổ quả mứt cuốn sách hay",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-1-10490869-b4b7-4deb-9197-85e81f9debe1.png?v=1739682304590",
      link: "/ban-dang-bo-qua-2"
    },
    {
      title: "‘Các bạn tôi ở trên ấy’ của nhà văn Nguyên Ngọc",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-10-d8ab10f8-7431-443f-a516-f1b8c38ff2e6.png?v=1735285611393",
      link: "/cac-ban-toi"
    },
    {
      title: "Tái ngộ độc giả của nhà văn Nguyên Ngọc",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/3-155d7431-57ee-45f8-89e7-ca2611f2dba2.png?v=1740455001480",
      link: "/tai-ngo-doc-gia"
    },
    {
      title: "‘KOCHLAND’ - Hồi tưởng chân thực về một triều đại",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/2-3f2b253-1053-4623-8b09-0e9749c73cfa.png?v=1733193076000",
      link: "/hoi-tuong-kochland"
    },
    {
      title: "Chuyện Hưa Tam Quang - Xã hội Trung Quốc hiện đại",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/1-46ec349a-42b5-41ba-8614-40e026d23850.png?v=1733710962293",
      link: "/xa-hoi-trung-quoc"
    },
    {
      title: "Blog mới 10: Khám phá sách hay",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://via.placeholder.com/300x200",
      link: "/blog-moi-10"
    },
    {
      title: "Blog mới 11: Hành trình đọc sách",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://via.placeholder.com/300x200",
      link: "/blog-moi-11"
    },
    {
      title: "Blog mới 12: Góc nhỏ văn học",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://via.placeholder.com/300x200",
      link: "/blog-moi-12"
    }
  ];

  categories: Category[] = [
    {
      title: "‘KOCHLAND’ - Hồi tưởng chân thực",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/2-3f2b253-1053-4623-8b09-0e9749c73cfa.png?v=1733193076000",
      link: "/kochland"
    },
    {
      title: "Bận đang bổ quả mứt cuốn sách",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-6.png?v=1735206474880",
      link: "/ban-dang-bo-qua-3"
    },
    {
      title: "Chuyện Hưa Tam Quang bắt mậu",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/1-46ec349a-42b5-41ba-8614-40e026d23850.png?v=1733710962293",
      link: "/chuyen-hua-tam"
    },
    {
      title: "Nguyễn Hữu Tam Quang bắt mậu",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-8-1ee4bcfb-f690-430b-b9ad-e68d852b7886.png?v=1740388337033",
      link: "/nguyen-huu-tam"
    },
    {
      title: "‘Các bạn tôi ở trên ấy’",
      date: "Thứ Hai, ngày 3/3/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-10-d8ab10f8-7431-443f-a516-f1b8c38ff2e6.png?v=1735285611393",
      link: "/cac-ban-toi-2"
    }
  ];
}