import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viet-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './viet-truyen.component.html',
  styleUrls: ['./viet-truyen.component.css']
})
export class VietTruyenComponent implements OnInit {
  dropdown: string | null = null;
  currentSection: string = 'truyen-moi'; // Mặc định hiển thị phần "Truyện mới"

  // Dữ liệu truyện
  story: any = {
    title: '',
    description: '',
    genres: [],
    targetAudience: '',
    coverImage: null
  };

  // Dữ liệu chương
  chapter: any = {
    content: ''
  };

  // Preview ảnh bìa
  coverImagePreview: string | null = null;

  // Tham chiếu đến input file
  @ViewChild('coverImageInput') coverImageInput!: ElementRef<HTMLInputElement>;

  // Danh sách thể loại (16 thể loại)
  genres: string[] = [
    'Tình cảm',
    'Kinh dị',
    'Hành động',
    'Viễn tưởng',
    'Học đường',
    'Lịch sử',
    'Trinh thám',
    'Tâm linh',
    'Hài hước',             
    'Fanfic',
    'Tu tiên',
    'Bách hợp',
    'Phiêu lưu',
    'Đô thị',
    'Đam mỹ',
    'Tâm lý'
  ];

  // Danh sách truyện của người dùng (giả lập)
  userStories: any[] = [
    {
      id: 1,
      title: 'Truyện chương có tiêu đề',
      coverImage: 'https://via.placeholder.com/100x150',
      views: 1976,
      chapters: ['Chương 1', 'Chương 2', 'Chương 3'],
      status: 'Hoàn thành',
      genres: ['Tình cảm', 'Đời thường']
    },
    {
      id: 2,
      title: 'Truyện chương có tiêu đề',
      coverImage: 'https://via.placeholder.com/100x150',
      views: 1976,
      chapters: ['Chương 1'],
      status: 'Hoàn thành',
      genres: ['Tình cảm', 'Đời thường']
    },
    {
      id: 3,
      title: 'Truyện chương có tiêu đề',
      coverImage: 'https://via.placeholder.com/100x150',
      views: 1976,
      chapters: ['Chương 1', 'Chương 2'],
      status: 'Hoàn thành',
      genres: ['Tình cảm', 'Đời thường']
    }
  ];

  // Quản lý lỗi
  errors: any = {
    coverImage: false,
    title: false,
    description: false,
    genres: false
  };
  errorMessage: string | null = null;

  ngOnInit(): void {
    // Khởi tạo nếu cần
  }

  // Toggle dropdown menu
  toggleDropdown(menu: string) {
    console.log('Toggle dropdown:', menu, 'Current dropdown:', this.dropdown);
    this.dropdown = this.dropdown === menu ? null : menu;
  }

  // Điều hướng giả giữa các phần
  navigateToSection(section: string) {
    this.currentSection = section;
  }

  // Điều hướng đến phần viết tiếp
  navigateToVietTiep(storyId: number) {
    console.log('Điều hướng đến viết tiếp cho truyện ID:', storyId);
    this.currentSection = 'viet-tiep';
  }

  // Kích hoạt input file khi nhấn vào khung ảnh
  triggerFileInput() {
    this.coverImageInput.nativeElement.click();
  }

  // Xử lý upload ảnh bìa
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.story.coverImage = file;

      // Hiển thị preview ảnh
      const reader = new FileReader();
      reader.onload = () => {
        this.coverImagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Xử lý chọn thể loại
  onGenreChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedGenre = select.value;

    if (this.story.genres.length < 3 && !this.story.genres.includes(selectedGenre)) {
      this.story.genres.push(selectedGenre);
    } else if (this.story.genres.length >= 3) {
      alert('Bạn chỉ có thể chọn tối đa 3 thể loại.');
    }
  }

  // Xóa thể loại đã chọn
  removeGenre(index: number) {
    this.story.genres.splice(index, 1);
  }

  // Kiểm tra dữ liệu đầu vào
  validateForm(): boolean {
    this.errors = {
      coverImage: false,
      title: false,
      description: false,
      genres: false
    };
    this.errorMessage = null;

    let isValid = true;

    if (!this.story.coverImage) {
      this.errors.coverImage = true;
      isValid = false;
    }
    if (!this.story.title.trim()) {
      this.errors.title = true;
      isValid = false;
    }
    if (!this.story.description.trim()) {
      this.errors.description = true;
      isValid = false;
    }
    if (this.story.genres.length === 0) {
      this.errors.genres = true;
      isValid = false;
    }

    if (!isValid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ thông tin truyện.';
    }

    return isValid;
  }

  // Lưu thông tin truyện
  saveStory() {
    if (this.validateForm()) {
      console.log('Lưu thông tin truyện:', this.story);
      alert('Thông tin truyện đã được lưu!');
      // Thêm logic lưu truyện (gọi API hoặc lưu vào local storage nếu cần)
    }
  }

  // Bắt đầu viết chương
  startWriting() {
    if (this.validateForm()) {
      this.navigateToSection('viet-chuong');
    }
  }

  // Lưu chương
  saveChapter() {
    console.log('Lưu chương:', this.chapter);
    alert('Chương đã được lưu!');

    // Logic lưu chương vào MongoDB (để sau)
    /*
    const chapterData = {
      storyId: this.story.id, // ID của truyện
      content: this.chapter.content,
      chapterNumber: 1 // Số chương (có thể tự động tăng)
    };
    this.storyService.saveChapter(chapterData).subscribe({
      next: (response) => {
        alert('Chương đã được lưu vào cơ sở dữ liệu!');
      },
      error: (err) => {
        console.error('Lỗi khi lưu chương:', err);
      }
    });
    */
  }

  // Đăng tải chương
  publishChapter() {
    console.log('Đăng tải chương:', this.chapter);
    alert('Chương đã được đăng tải!');

    // Logic lưu chương vào MongoDB và hiển thị lên giao diện
    /*
    const chapterData = {
      storyId: this.story.id,
      content: this.chapter.content,
      chapterNumber: 1
    };
    this.storyService.publishChapter(chapterData).subscribe({
      next: (response) => {
        // Cập nhật danh sách truyện của người dùng
        const storyIndex = this.userStories.findIndex(s => s.id === this.story.id);
        if (storyIndex !== -1) {
          this.userStories[storyIndex].chapters.push(`Chương ${this.userStories[storyIndex].chapters.length + 1}`);
        }
        alert('Chương đã được đăng tải và hiển thị!');
      },
      error: (err) => {
        console.error('Lỗi khi đăng tải chương:', err);
      }
    });
    */
  }
}