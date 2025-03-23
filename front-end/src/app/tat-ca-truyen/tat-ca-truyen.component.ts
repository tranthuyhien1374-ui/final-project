import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryService } from '../services/story.service';

interface Story {
  _id: string;
  title: string;
  author: string;
  authorId: number;
  status: string;
  image: string;
  genres: string[];
  progress: string;
}

@Component({
  selector: 'app-tat-ca-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tat-ca-truyen.component.html',
  styleUrl: './tat-ca-truyen.component.css'
})
export class TatCaTruyenComponent implements OnInit {
  allStories: Story[] = [];
  filteredStories: Story[] = [];
  displayedStories: Story[] = [];
  searchQuery: string = '';
  selectedStatus: string = '';
  selectedProgress: string = '';
  selectedGenres: string[] = [];
  displayLimit: number = 10;

  genres: string[] = [
    'Tình cảm', 'Hành động', 'Học đường', 'Trinh thám', 'Hài hước', 'Tu tiên', 'Phiêu lưu', 'Đam mỹ',
    'Kinh dị', 'Viễn tưởng', 'Lịch sử', 'Tâm linh', 'Fanfic', 'Bách hợp', 'Đô thị', 'Tâm lý'
  ];

  statusOptions: string[] = ['Mới nhất', 'Truyện hot'];
  progressOptions: string[] = ['Đã hoàn thành', 'Đang ra'];

  constructor(private router: Router, private route: ActivatedRoute, private storyService: StoryService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedStatus = this.statusOptions.includes(params['status']) ? params['status'] : '';
      this.selectedProgress = this.progressOptions.includes(params['progress']) ? params['progress'] : '';
      this.loadStories();
    });
  }

  loadStories() {
    this.storyService.filterStories(this.selectedGenres, this.selectedStatus, this.selectedProgress).subscribe(stories => {
      this.allStories = stories;
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = [...this.allStories];
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(query) || story.author.toLowerCase().includes(query)
      );
    }
    
    this.filteredStories = filtered;
    this.updateDisplayedStories();
  }

  updateDisplayedStories() {
    this.displayedStories = this.filteredStories.slice(0, this.displayLimit);
  }

  onGenreChange(genre: string, event: any) {
    if (event.target.checked) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    }
    this.loadStories();
  }

  resetFilters() {
    this.selectedStatus = '';
    this.selectedProgress = '';
    this.selectedGenres = [];
    this.searchQuery = '';
    this.displayLimit = 10;
    this.loadStories();
  }

  showMore() {
    this.displayLimit += 10;
    this.updateDisplayedStories();
  }

  navigateToStoryDetail(storyId: string) {
    this.router.navigate(['/chi-tiet-truyen', storyId]);
  }

  navigateToAuthor(authorId: number) {
    this.router.navigate(['/author', authorId]);
  }

  searchStories() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/tat-ca-truyen'], { queryParams: { search: this.searchQuery } });
    } else {
      this.router.navigate(['/tat-ca-truyen']);
    }
  }
}