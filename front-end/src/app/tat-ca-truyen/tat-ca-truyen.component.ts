import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

interface Story {
  id: number;
  title: string;
  author: string;
  authorId: number;
  status: string;
  image: string;
  genres: string[]; // Thêm trường genres để lọc theo thể loại
}

@Component({
  selector: 'app-tat-ca-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule
  templateUrl: './tat-ca-truyen.component.html',
  styleUrl: './tat-ca-truyen.component.css'
})
export class TatCaTruyenComponent implements OnInit {
  allStories: Story[] = [];
  filteredStories: Story[] = [];
  displayedStories: Story[] = []; // Danh sách truyện hiển thị (giới hạn 10 hoặc mở rộng)
  searchQuery: string = '';
  selectedStatus: string = ''; // Bộ lọc theo tình trạng
  selectedProgress: string = ''; // Bộ lọc theo tiến độ (Đã hoàn thành/Đang ra)
  selectedGenres: string[] = []; // Bộ lọc theo thể loại
  displayLimit: number = 10; // Giới hạn hiển thị ban đầu

  // Danh sách thể loại
  genres: string[] = [
    'Tình cảm', 'Tâm lý', 'Huyền bí', 'Lịch sử', 'Trinh thám', 'Hài hước', 'Tu tiên', 'Phiêu lưu',
    'Kinh dị', 'Viễn tưởng', 'Học đường', 'Trọng sinh', 'Thám hiểm', 'Fanfic', 'Bách hợp', 'Đam mỹ'
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Dữ liệu mẫu (có thêm genres)
    this.allStories = [
      { id: 1, title: 'Sủng Ái Hậu Vệ', author: 'Phượng Hoàng', authorId: 101, status: 'Mới nhất', image: 'assets/new-story1.jpg', genres: ['Tình cảm', 'Huyền bí'] },
      { id: 2, title: 'Hurricane', author: 'Collin', authorId: 102, status: 'Mới nhất', image: 'assets/new-story2.jpg', genres: ['Học đường', 'Tình cảm'] },
      { id: 3, title: 'Yêu Em Từ Cơn Mưa', author: 'YukiMaxu', authorId: 103, status: 'Mới nhất', image: 'assets/new-story3.jpg', genres: ['Tình cảm', 'Hài hước'] },
      { id: 4, title: 'Genius (Come)', author: 'Bandry', authorId: 104, status: 'Mới nhất', image: 'assets/new-story4.jpg', genres: ['Trinh thám', 'Học đường'] },
      { id: 5, title: 'Truyện 5', author: 'Tác giả 5', authorId: 105, status: 'Mới nhất', image: 'assets/new-story5.jpg', genres: ['Tình cảm', 'Huyền bí'] },
      { id: 6, title: 'Truyện 6', author: 'Tác giả 6', authorId: 106, status: 'Mới nhất', image: 'assets/new-story6.jpg', genres: ['Phiêu lưu', 'Hài hước'] },
      { id: 7, title: 'Định Thân Đồ', author: 'Thiên Mộng', authorId: 107, status: 'Đang đọc', image: 'assets/reading-story1.jpg', genres: ['Tình cảm', 'Tu tiên'] },
      { id: 8, title: 'Lặng Thinh', author: 'Linh', authorId: 108, status: 'Đang đọc', image: 'assets/reading-story2.jpg', genres: ['Tâm lý', 'Học đường'] },
      { id: 9, title: 'Truyện 9', author: 'Tác giả 9', authorId: 109, status: 'Đang đọc', image: 'assets/reading-story3.jpg', genres: ['Huyền bí', 'Trinh thám'] },
      { id: 10, title: 'Truyện 10', author: 'Tác giả 10', authorId: 110, status: 'Đang đọc', image: 'assets/reading-story4.jpg', genres: ['Phiêu lưu', 'Fanfic'] },
      { id: 11, title: 'Truyện 11', author: 'Tác giả 11', authorId: 111, status: 'Đang đọc', image: 'assets/reading-story5.jpg', genres: ['Học đường', 'Bách hợp'] },
      { id: 12, title: 'Hồng Nhạn', author: 'Đông Phương Bất Bại', authorId: 112, status: 'Truyện hot', image: 'assets/hot-story1.jpg', genres: ['Huyền bí', 'Tu tiên'] },
      { id: 13, title: 'Thiên Đỉnh Hào', author: 'Thiên Ma', authorId: 113, status: 'Truyện hot', image: 'assets/hot-story2.jpg', genres: ['Phiêu lưu', 'Hài hước'] },
      { id: 14, title: 'Truyện 14', author: 'Tác giả 14', authorId: 114, status: 'Truyện hot', image: 'assets/hot-story3.jpg', genres: ['Tình cảm', 'Học đường'] },
      { id: 15, title: 'Truyện 15', author: 'Tác giả 15', authorId: 115, status: 'Truyện hot', image: 'assets/hot-story4.jpg', genres: ['Trinh thám', 'Huyền bí'] },
      { id: 16, title: 'Truyện 16', author: 'Tác giả 16', authorId: 116, status: 'Truyện hot', image: 'assets/hot-story5.jpg', genres: ['Hài hước', 'Fanfic'] },
      { id: 17, title: 'Chỉ Muốn Ở Bên', author: 'Mộng Tiểu Lam', authorId: 117, status: 'Đã hoàn thành', image: 'assets/completed-story1.jpg', genres: ['Tình cảm', 'Học đường'] },
      { id: 18, title: 'Đông Cung', author: 'Lan Lăng', authorId: 118, status: 'Đã hoàn thành', image: 'assets/completed-story2.jpg', genres: ['Huyền bí', 'Lịch sử'] },
      { id: 19, title: 'Truyện 19', author: 'Tác giả 19', authorId: 119, status: 'Đã hoàn thành', image: 'assets/completed-story3.jpg', genres: ['Tâm lý', 'Trinh thám'] },
      { id: 20, title: 'Truyện 20', author: 'Tác giả 20', authorId: 120, status: 'Đã hoàn thành', image: 'assets/completed-story4.jpg', genres: ['Phiêu lưu', 'Hài hước'] },
      { id: 21, title: 'Truyện 21', author: 'Tác giả 21', authorId: 121, status: 'Đã hoàn thành', image: 'assets/completed-story5.jpg', genres: ['Tình cảm', 'Fanfic'] }
    ];

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedStatus = params['status'] || ''; // Nhận tham số status từ URL
      this.selectedProgress = params['progress'] || '';
      if (params['completed'] === 'true') {
        this.selectedProgress = 'Đã hoàn thành';
      }
      this.applyFilters();
    });
  }

  // Áp dụng bộ lọc
  applyFilters() {
    let filtered = [...this.allStories];

    // Lọc theo từ khóa tìm kiếm
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(query) || story.author.toLowerCase().includes(query)
      );
    }

    // Lọc theo tình trạng (Truyện hot, Đang đọc, Mới nhất)
    if (this.selectedStatus) {
      filtered = filtered.filter(story => story.status === this.selectedStatus);
    }

    // Lọc theo tiến độ (Đã hoàn thành, Đang ra)
    if (this.selectedProgress) {
      filtered = filtered.filter(story =>
        this.selectedProgress === 'Đã hoàn thành' ? story.status === 'Đã hoàn thành' : story.status !== 'Đã hoàn thành'
      );
    }

    // Lọc theo thể loại
    if (this.selectedGenres.length > 0) {
      filtered = filtered.filter(story =>
        this.selectedGenres.some(genre => story.genres.includes(genre))
      );
    }

    this.filteredStories = filtered;
    this.updateDisplayedStories();
  }

  // Cập nhật danh sách truyện hiển thị
  updateDisplayedStories() {
    this.displayedStories = this.filteredStories.slice(0, this.displayLimit);
  }

  // Xử lý khi chọn thể loại
  onGenreChange(genre: string, event: any) {
    if (event.target.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
    this.applyFilters();
  }

  // Reset bộ lọc
  resetFilters() {
    this.selectedStatus = '';
    this.selectedProgress = '';
    this.selectedGenres = [];
    this.searchQuery = '';
    this.displayLimit = 10;
    this.applyFilters();
  }

  // Xử lý nút "Xem thêm"
  showMore() {
    this.displayLimit += 10;
    this.updateDisplayedStories();
  }

  navigateToStoryDetail(storyId: number) {
    this.router.navigate(['/chi-tiet-truyen', storyId]);
  }

  navigateToAuthor(authorId: number) {
    this.router.navigate(['/author', authorId]);
  }

  searchStories() {
    console.log('Search button clicked, query:', this.searchQuery); // Thêm log để debug
    if (this.searchQuery.trim()) {
      this.router.navigate(['/tat-ca-truyen'], { queryParams: { search: this.searchQuery } });
    } else {
      this.router.navigate(['/tat-ca-truyen']);
    }
  }
}