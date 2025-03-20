import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

interface Author {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface Work {
  title: string;
  image: string;
}

interface RelatedNews {
  title: string;
  date: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-chi-tiet-tac-gia',
  templateUrl: './chi-tiet-tac-gia.component.html',
  styleUrls: ['./chi-tiet-tac-gia.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChiTietTacGiaComponent implements OnInit {
  author: Author | undefined;
  works: Work[] = [];
  relatedNews: RelatedNews[] = [];
  errorMessage: string | undefined;

  private authors: Author[] = [
    {
      id: "kolya-bui",
      name: "Kolya Bùi",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/blank-profile-picture-973460-640-084e4e29-55b0-4110-a202-e789fff36a77.png?v=1722592915460",
      description: "Kolya Bùi là một tác giả trẻ nổi tiếng với các tác phẩm văn học hiện đại, tập trung vào các chủ đề về tuổi trẻ và hành trình tìm kiếm bản thân."
    },
    {
      id: "timothy-corrigan",
      name: "Timothy Corrigan",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/ta-c-gia-3.png?v=1724228914707",
      description: "Timothy Corrigan là Giáo sư danh dự ngành Ngôn ngữ Anh và Nghiên cứu Diện ảnh tại Đại học Pennsylvania. Trong lĩnh vực nghiên cứu điện ảnh, ông tập trung nghiên cứu điện ảnh cổ điển, đặc biệt là phim điện ảnh Mỹ, ông từng được trao giải thưởng cao quý của Hội Điện ảnh Mỹ trong năm 1994. Ông là tác giả của các tác phẩm nổi tiếng như: New German Film: The Displaced Image (1994), Film and Literature: An Introduction and Reader (1999), American Cinema of the 2000s: Themes and Variations (2012), Cinema, Media, and Human Flourishing (2022), Năm 2016, ông xuất bản cuốn The Essay Film: From Montaigne, After Marker và đoạt giải thưởng Katherine Singer Kovács năm cho cuốn sách xuất sắc về truyền thông."
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const authorId = this.route.snapshot.paramMap.get('id');
    if (authorId) {
      this.author = this.authors.find(author => author.id === authorId);
      if (this.author) {
        this.works = [
          { title: "Sinh vật huyền bí Việt Nam", image: "https://via.placeholder.com/150x200" },
          { title: "Collins", image: "https://via.placeholder.com/150x200" },
          { title: "(Bakugou x Reader) Friend to Lovers", image: "https://via.placeholder.com/150x200" },
          { title: "GeminiFourth | Trùm và Cớm", image: "https://via.placeholder.com/150x200" }
        ];

        this.relatedNews = [
          {
            title: "“KOCHLAND” – Hệ thống ảnh hưởng chính trị lớn không ngần ngại đầu mưu",
            date: "Thứ Hai, ngày 3/3/2025",
            image: "https://bizweb.dktcdn.net/100/363/455/articles/2-3f2b253-1053-4623-8b09-0e9749c73cfa.png?v=1733193076000",
            link: "/kochland"
          },
          {
            title: "Bận đang bổ quả mứt cuốn sách hay về nhân chính học",
            date: "Thứ Hai, ngày 3/3/2025",
            image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-6.png?v=1735206474880",
            link: "/ban-dang-bo-qua-3"
          },
          {
            title: "Chuyện Hưa Tam Quang bắt mậu - Người bình dân",
            date: "Thứ Hai, ngày 3/3/2025",
            image: "https://bizweb.dktcdn.net/100/363/455/articles/1-46ec349a-42b5-41ba-8614-40e026d23850.png?v=1733710962293",
            link: "/chuyen-hua-tam"
          },
          {
            title: "Còn gì nha cho Che Lan Vien hoi ngo ban doc voi truy ngan tan van",
            date: "Thứ Hai, ngày 1/3/2025",
            image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-8-1ee4bcfb-f690-430b-b9ad-e68d852b7886.png?v=1740388337033",
            link: "/nguyen-huu-tam"
          }
        ];
      } else {
        this.errorMessage = "Không tìm thấy tác giả.";
      }
    }
  }
}
