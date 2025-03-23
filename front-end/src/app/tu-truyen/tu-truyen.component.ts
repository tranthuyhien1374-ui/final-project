import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
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
  newStories: Story[] = [];
  readingStories: Story[] = [];
  hotStories: Story[] = [];
  completedStories: Story[] = [];

  constructor(private router: Router, private storyService: StoryService) {}

  ngAfterViewInit() {
    console.log('TuTruyenComponent loaded');
    this.loadStories();
  }

  loadStories() {
    this.storyService.filterStories([], 'Mới nhất').subscribe(stories => {
      this.newStories = stories.slice(0, 6);
    });

    this.storyService.filterStories([], 'Đang đọc').subscribe(stories => {
      this.readingStories = stories.slice(0, 5);
    });

    this.storyService.filterStories([], 'Truyện hot').subscribe(stories => {
      this.hotStories = stories.slice(0, 5);
    });

    this.storyService.filterStories([], 'Đã hoàn thành').subscribe(stories => {
      this.completedStories = stories.slice(0, 5);
    });
  }

  navigateToAllStories() {
    this.router.navigate(['/tat-ca-truyen'], { queryParams: { status: 'Mới nhất' } });
  }

  navigateToStoryDetail(storyId: string) {
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
    if (this.searchQuery.trim()) {
      this.router.navigate(['/tat-ca-truyen'], { queryParams: { search: this.searchQuery } });
    } else {
      this.router.navigate(['/tat-ca-truyen']);
    }
  }

}