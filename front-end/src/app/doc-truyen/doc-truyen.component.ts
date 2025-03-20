import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryService } from '../services/story.service';

interface Chapter {
  _id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string;
  date: string;
}

interface Story {
  _id: string;
  title: string;
  author: string;
  authorId: number;
  status: string;
  image: string;
  genres: string[];
  views: number;
  chapters?: { _id: string; chapterNumber: number; title: string; date: string }[];
  description: string;
}

interface Comment {
  _id: string;
  storyId: string;
  chapterId?: string | null;
  username: string;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-doc-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-truyen.component.html',
  styleUrls: ['./doc-truyen.component.css']
})
export class DocTruyenComponent implements OnInit {
  storyId: string | null = null;
  currentChapter: number = 1;
  totalChapters: number = 0;
  storyTitle: string = '';
  chapter: Chapter | null = null;
  comments: Comment[] = [];

  isLoggedIn = false;
  username = this.isLoggedIn ? 'user123' : 'Anonymous';
  newComment = '';
  showPopup = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    this.storyId = this.route.snapshot.paramMap.get('storyId');
    this.currentChapter = Number(this.route.snapshot.paramMap.get('chapterId')) || 1;

    if (this.storyId) {
      this.loadStory();
      this.loadChapter();
      this.loadComments();
    } else {
      console.error('storyId is missing, cannot load chapter'); 
    }
  }

  loadStory() {
    if (this.storyId) {
      this.storyService.getStoryById(this.storyId).subscribe({
        next: (story) => {
          this.storyTitle = story.title;
          this.totalChapters = story.chapters ? story.chapters.length : 0; // Kiểm tra story.chapters
        },
        error: (err) => {
          console.error('Error fetching story:', err);
          this.storyTitle = 'Không tìm thấy truyện';
          this.totalChapters = 0;
        }
      });
    }
  }

  loadChapter() {
    if (this.storyId) {
      console.log('Loading chapter with:', { storyId: this.storyId, chapterNumber: this.currentChapter });
      this.storyService.getChapter(this.storyId, this.currentChapter).subscribe({
        next: (chapter) => {
          console.log('Chapter loaded successfully:', chapter);
          this.chapter = chapter;
          this.loadComments();
        },
        error: (err) => {
          console.error('Error fetching chapter:', {
            status: err.status,
            statusText: err.statusText,
            message: err.message,
            error: err.error
          });
          this.chapter = null;
        },
        complete: () => {
          console.log('Chapter loading completed');
        }
      });
    } else {
      console.error('storyId is missing');
      this.chapter = null;
    }
  }

  loadComments() {
    if (this.storyId && this.chapter?._id) {
      this.storyService.getChapterComments(this.storyId, this.chapter._id).subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (err) => {
          console.error('Error fetching comments:', err);
          this.comments = [];
        }
      });
    }
  }

  prevChapter() {
    if (this.currentChapter > 1) {
      this.currentChapter--;
      this.router.navigate(['/doc-truyen', this.storyId, this.currentChapter]);
      this.loadChapter();
    }
  }

  nextChapter() {
    if (this.currentChapter < this.totalChapters) {
      this.currentChapter++;
      this.router.navigate(['/doc-truyen', this.storyId, this.currentChapter]);
      this.loadChapter();
    }
  }

  addComment() {
    if (this.newComment.trim() && this.storyId && this.chapter?._id) {
      const comment = {
        storyId: this.storyId,
        chapterId: this.chapter._id,
        username: this.username,
        content: this.newComment,
        timestamp: new Date().toISOString()
      };
      this.storyService.addComment(comment).subscribe({
        next: (newComment) => {
          this.comments.unshift({
            _id: newComment._id,
            storyId: newComment.storyId,
            chapterId: newComment.chapterId || null,
            username: newComment.username,
            content: newComment.content,
            timestamp: newComment.timestamp
          });
          this.newComment = '';
          if (this.comments.length > 5) this.comments.pop();
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
    }
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }
}