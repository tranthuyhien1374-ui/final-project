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
    'Tình cảm', 'Tâm lý', 'Huyền bí', 'Lịch sử', 'Trinh thám', 'Hài hước', 'Tu tiên', 'Phiêu lưu',
    'Kinh dị', 'Viễn tưởng', 'Học đường', 'Trọng sinh', 'Thám hiểm', 'Fanfic', 'Bách hợp', 'Đam mỹ'
  ];

  constructor(private router: Router, private route: ActivatedRoute, private storyService: StoryService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.selectedStatus = params['status'] || '';
      this.selectedProgress = params['progress'] || '';
      if (params['completed'] === 'true') {
        this.selectedProgress = 'Đã hoàn thành';
      }
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
    console.log('Applying filters on:', filtered);
  
    if (this.selectedStatus) {
      filtered = filtered.filter(story => story.status === this.selectedStatus);
    }
  
    if (this.selectedProgress) {
      filtered = filtered.filter(story =>
        this.selectedProgress === 'Đã hoàn thành'
          ? story.status === 'Đã hoàn thành'
          : story.status !== 'Đã hoàn thành'
      );
    }
  
    if (this.selectedGenres.length > 0) {
      filtered = filtered.filter(story =>
        this.selectedGenres.some(genre => story.genres.includes(genre))
      );
    }
  
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(story =>
        story.title.toLowerCase().includes(query) || story.author.toLowerCase().includes(query)
      );
    }
  
    console.log('Filtered stories:', filtered);
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