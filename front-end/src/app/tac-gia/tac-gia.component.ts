import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

interface Author {
  id: string;
  name: string;
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
  selector: 'app-tac-gia',
  templateUrl: './tac-gia.component.html',
  styleUrls: ['./tac-gia.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] // Thêm RouterModule vào imports
})
export class TacGiaComponent {
  authors: Author[] = [
    { id: "kolya-bui", name: "Kolya Bùi", image: "https://bizweb.dktcdn.net/100/363/455/articles/blank-profile-picture-973460-640-084e4e29-55b0-4110-a202-e789fff36a77.png?v=1722592915460", link: "/tac-gia/kolya-bui" },
    { id: "ngo-diep", name: "Ngọ Diệp", image: "https://bizweb.dktcdn.net/100/363/455/articles/blank-profile-picture-973460-640-0dfabba4-113b-4706-9249-9065edbce130.png?v=1722322757573", link: "/tac-gia/ngo-diep" },
    { id: "timothy-corrigan", name: "Timothy Corrigan", image: "https://bizweb.dktcdn.net/100/363/455/articles/ta-c-gia-3.png?v=1724228914707", link: "/tac-gia/timothy-corrigan" },
    { id: "wu-ming-yi", name: "Wu Ming-Yi", image: "https://bizweb.dktcdn.net/100/363/455/articles/blue-and-white-modern-t-shirt-sale-instagram-post-2.png?v=1724228338707", link: "/tac-gia/wu-ming-yi" },
    { id: "maxime-peroz", name: "Maxime Péroz", image: "https://bizweb.dktcdn.net/100/363/455/articles/ta-c-gia-1.png?v=1724228634843", link: "/tac-gia/maxime-peroz" },
    { id: "james-west", name: "James West", image: "https://bizweb.dktcdn.net/100/363/455/articles/ta-c-gia.png?v=1724228531227", link: "/tac-gia/james-west" },
    { id: "ly-mong-te", name: "Lý Mộng Tế", image: "https://bizweb.dktcdn.net/100/363/455/articles/blank-profile-picture-973460-640-041f523a-b170-40ae-b8c4-3e960e0949df.png?v=1722322207163", link: "/tac-gia/ly-mong-te" },
    { id: "truong-van-thanh", name: "Trương Văn Thành", image: "https://bizweb.dktcdn.net/100/363/455/articles/blank-profile-picture-973460-640-d12952e8-df6c-4e8f-ae63-204a86656468.png?v=1722307687713", link: "/tac-gia/truong-van-thanh" },
    { id: "tran-loi", name: "Trần Lỗi", image: "https://bizweb.dktcdn.net/100/363/455/articles/1675677217l032559803.png?v=1722307623220", link: "/tac-gia/tran-loi" },
    { id: "nick-trenton", name: "NICK TRENTON", image: "https://bizweb.dktcdn.net/100/363/455/articles/4ui3rd3rosucf7gje275uuadbn.jpeg?v=1724229328490", link: "/tac-gia/nick-trenton" },
    { id: "herve-le-tellier", name: "Hervé Le Tellier", image: "https://bizweb.dktcdn.net/100/363/455/articles/herve-le-tellier-2021.png?v=1722306208657", link: "/tac-gia/herve-le-tellier" },
    { id: "amos-oz", name: "Amos Oz", image: "https://bizweb.dktcdn.net/100/363/455/articles/amos-oz-israeli-author-cropped.jpg?v=1722305842767", link: "/tac-gia/amos-oz" }
  ];

  categories: Category[] = [
    {
      title: "Trò chuyện về cuốn sách: Chuyện nhà Tí của nhà văn Phan Thị Vàng Anh",
      date: "Thứ Hai, 17/03/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-17-51a80241-426c-4785-b5e1-9aedf8dff8c0.png?v=1742197752157",
      link: "/tro-chuyen-ve-cuon-sach-chuyen-nha-ti-cua-nha-van-phan-thi-vang-anh"
    },
    {
      title: "Sự kiện giao lưu với tác giả và dịch giả 'Bố con cá gai'",
      date: "Thứ Hai, 03/03/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/480203269-1042894241211643-9180551152830458713-n.jpg?v=1740994652690",
      link: "/su-kien-giao-luu-voi-tac-gia-va-dich-gia-bo-con-ca-gai"
    },
    {
      title: "'Quyền lực' của đất đai",
      date: "Chủ Nhật, 02/03/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/website-a-nh-da-i-die-n-ba-i-vie-t-14-42424747-4313-46a1-a9d9-0375b3214194.png?v=1740891085440",
      link: "/quyen-luc-cua-dat-dai"
    },
    {
      title: "Sự kiện: Ra mắt cuốn sách ĐẤT ĐAI - Ham muốn sở hữu định hình thế giới hiện đại",
      date: "Thứ Sáu, 21/02/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/1-13cd774c-b58f-461e-9a81-9e614842fb12.png?v=1740115538713",
      link: "/su-kien-ra-mat-cuon-sach-dat-dai-ham-muon-so-huu-dinh-hinh-the-gioi-hien-dai"
    },
    {
      title: "Sự kiện: Ra mắt cuốn sách Biểu tượng, phù hiệu và đồ thờ của người An Nam của tác giả Gustave Dumoutier",
      date: "Thứ Tư, 12/02/2025",
      image: "https://bizweb.dktcdn.net/100/363/455/articles/477685389-1035235648644169-7953768034719337909-n.jpg?v=1739352974687",
      link: "/su-kien-ra-mat-cuon-sach-bieu-tuong-phu-hieu-va-do-tho-cua-nguoi-an-nam-cua-tac-gia-gustave-dumoutier"
    }
  ];
}