import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  title: string;
  date: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-chi-tiet-blog',
  templateUrl: './chi-tiet-blog.component.html',
  styleUrls: ['./chi-tiet-blog.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ChiTietBlogComponent {
  // Dữ liệu nội dung chính (cập nhật nội dung đầy đủ hơn)
  blogDetail = {
    title: "Tên của đô hổng: Khoảng kiến thức về triết học, lý luận, tông giao, lịch sử ẩn sau một cột truyện tranh đầy thực",
    date: "Thứ Bảy, 04/05/2024",
    content: `
      <p><strong>Có lẽ, Umberto Eco không ra một cái tên xa lạ với độc giả Việt Nam sau khi độc lập “Tội của dân khấp, kiến thức ở một bình, rõ cuộc chiến thắng của một người không ngần ngại đặt những câu hỏi về sự thật.” VÀ TÊN CỦA ĐÔ HỔNG xứng đáng là một món quà như thế.</strong></p>
      <p>Tọa tại Los Angeles Times danh gia Umberto Eco là “một trong những nhà tư tưởng có ảnh hưởng lớn nhất của thế kỷ 20”, trong đó các cuốn sách của ông đã được dịch ra hơn 40 ngôn ngữ, tác phẩm của ông là nền tảng của nền văn chương và triết học hiện đại, lý luận, tôn giáo, lịch sử, ẩn sau một cột truyện tranh đầy thực.</p>
      <p><strong>“Tên của đô hổng” là một cuốn tiểu thuyết phong phú và đa dạng, tap, tác phẩm thực sự độc đáo khi pha trộn giữa tiểu thuyết lịch sử, lý thuyết triết học, và những câu chuyện bí ẩn, trong đó các câu chuyện chính là những câu hỏi về sự thật, kiến thức và quyền lực. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm.</strong></p>
      <p>“Tên của đô hổng” mở ra một mê cung tri thức vĩ đại, là nơi hội tụ của triết học, lý luận, tôn giáo, và lịch sử. Trong đó, các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm.</p>
      <p>Trong cuốn sách, Umberto Eco sử dụng một số lượng lớn các tài liệu và triết lý cổ điển để tạo nên một câu chuyện đầy hấp dẫn, trong đó các nhân vật chính là những người đang tìm kiếm sự thật trong một thế giới đầy những bí ẩn và những âm mưu chính trị đầy nguy hiểm. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm.</p>
      <p>Sức mạnh của “Tên của đô hổng” không chỉ nằm ở nội dung phong phú và đa dạng, mà còn ở cách Umberto Eco sử dụng ngôn ngữ để tạo nên một câu chuyện đầy hấp dẫn, trong đó các nhân vật chính là những người đang tìm kiếm sự thật trong một thế giới đầy những bí ẩn và những âm mưu chính trị đầy nguy hiểm. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm.</p>
      <p>Lòng trung thành trong “Tên của đô hổng” không chỉ là một câu chuyện về những tác phẩm văn học, mà còn là một câu chuyện về những giá trị của con người, trong đó các nhân vật chính là những người đang tìm kiếm sự thật trong một thế giới đầy những bí ẩn và những âm mưu chính trị đầy nguy hiểm. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm.</p>
      <p>Với chương trình chi tiết, các nhân vật chính của Umberto Eco đã và đang được nhiều người yêu thích bởi sự đa dạng và chiều sâu của họ, trong đó các nhân vật chính là những người đang tìm kiếm sự thật trong một thế giới đầy những bí ẩn và những âm mưu chính trị đầy nguy hiểm. Kiệt tác này mang đến cho độc giả một cuộc hành trình xuyên qua một mê cung đầy những câu hỏi về triết học và lý luận, trong đó các sự kiện được diễn ra trong một khung cảnh đầy màu sắc, từ những năm 1327 tại một tu viện ở Ý, nơi mà các nhà sư đang bị đe dọa bởi những bí ẩn và những âm mưu chính trị đầy nguy hiểm. (Theo Los Angeles Times).</p>
    `
  };

  // Dữ liệu "Tin liên quan" từ đoạn code trước
  relatedCategories: Category[] = [
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
    }
  ];
}