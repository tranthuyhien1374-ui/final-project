import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Story {
  id: number;
  title: string;
  author: string;
  authorId: number;
  status: string;
  image: string;
}

@Component({
  selector: 'app-tu-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tu-truyen.component.html',
  styleUrl: './tu-truyen.component.css'
})
export class TuTruyenComponent implements AfterViewInit {
  searchQuery: string = '';

  constructor(private router: Router) {}

  newStories: Story[] = [
    { id: 1, title: 'Sủng Ái Hậu Vệ', author: 'Phượng Hoàng', authorId: 101, status: 'Đang ra', image: 'assets/new-story1.jpg' },
    { id: 2, title: 'Hurricane', author: 'Collin', authorId: 102, status: 'Đang ra', image: 'assets/new-story2.jpg' },
    { id: 3, title: 'Yêu Em Từ Cơn Mưa', author: 'YukiMaxu', authorId: 103, status: 'Đang ra', image: 'assets/new-story3.jpg' },
    { id: 4, title: 'Genius (Come)', author: 'Bandry', authorId: 104, status: 'Đang ra', image: 'assets/new-story4.jpg' },
    { id: 5, title: 'Truyện 5', author: 'Tác giả 5', authorId: 105, status: 'Đang ra', image: 'assets/new-story5.jpg' },
    { id: 6, title: 'Truyện 6', author: 'Tác giả 6', authorId: 106, status: 'Đang ra', image: 'assets/new-story6.jpg' }
  ];

  readingStories: Story[] = [
    { id: 7, title: 'Định Thân Đồ', author: 'Thiên Mộng', authorId: 107, status: 'Đang đọc', image: 'assets/reading-story1.jpg' },
    { id: 8, title: 'Lặng Thinh', author: 'Linh', authorId: 108, status: 'Đang đọc', image: 'assets/reading-story2.jpg' },
    { id: 9, title: 'Truyện 9', author: 'Tác giả 9', authorId: 109, status: 'Đang đọc', image: 'assets/reading-story3.jpg' },
    { id: 10, title: 'Truyện 10', author: 'Tác giả 10', authorId: 110, status: 'Đang đọc', image: 'assets/reading-story4.jpg' },
    { id: 11, title: 'Truyện 11', author: 'Tác giả 11', authorId: 111, status: 'Đang đọc', image: 'assets/reading-story5.jpg' }
  ];

  hotStories: Story[] = [
    { id: 12, title: 'Hồng Nhạn', author: 'Đông Phương Bất Bại', authorId: 112, status: 'Đang hot', image: 'assets/hot-story1.jpg' },
    { id: 13, title: 'Thiên Đỉnh Hào', author: 'Thiên Ma', authorId: 113, status: 'Đang hot', image: 'assets/hot-story2.jpg' },
    { id: 14, title: 'Truyện 14', author: 'Tác giả 14', authorId: 114, status: 'Đang hot', image: 'assets/hot-story3.jpg' },
    { id: 15, title: 'Truyện 15', author: 'Tác giả 15', authorId: 115, status: 'Đang hot', image: 'assets/hot-story4.jpg' },
    { id: 16, title: 'Truyện 16', author: 'Tác giả 16', authorId: 116, status: 'Đang hot', image: 'assets/hot-story5.jpg' }
  ];

  completedStories: Story[] = [
    { id: 17, title: 'Chỉ Muốn Ở Bên', author: 'Mộng Tiểu Lam', authorId: 117, status: 'Hoàn thành', image: 'assets/completed-story1.jpg' },
    { id: 18, title: 'Đông Cung', author: 'Lan Lăng', authorId: 118, status: 'Hoàn thành', image: 'assets/completed-story2.jpg' },
    { id: 19, title: 'Truyện 19', author: 'Tác giả 19', authorId: 119, status: 'Hoàn thành', image: 'assets/completed-story3.jpg' },
    { id: 20, title: 'Truyện 20', author: 'Tác giả 20', authorId: 120, status: 'Hoàn thành', image: 'assets/completed-story4.jpg' },
    { id: 21, title: 'Truyện 21', author: 'Tác giả 21', authorId: 121, status: 'Hoàn thành', image: 'assets/completed-story5.jpg' }
  ];

  ngAfterViewInit() {
    // Không cần nếu dùng CDN
  }

  navigateToAllStories() {
    this.router.navigate(['/tat-ca-truyen'], { queryParams: { status: 'Mới nhất' } });
  }

  navigateToStoryDetail(storyId: number) {
    this.router.navigate(['/chi-tiet-truyen', storyId]);
  }

  navigateToReadingStories() {
    this.router.navigate(['/tat-ca-truyen'], { queryParams: { status: 'Đang đọc' } });
  }

  navigateToHotStories() {
    this.router.navigate(['/tat-ca-truyen'], { queryParams: { status: 'Truyện hot' } });
  }

  navigateToCompletedStories() {
    this.router.navigate(['/tat-ca-truyen'], { queryParams: { progress: 'Đã hoàn thành' } });
  }

  navigateToAuthor(authorId: number) {
    this.router.navigate(['/author', authorId]);
  }

  onImageError(event: Event) {
    console.error('Image failed to load:', event);
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