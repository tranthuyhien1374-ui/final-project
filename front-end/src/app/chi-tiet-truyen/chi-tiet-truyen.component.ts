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
  views: number;
  chapters: { _id: string; chapterNumber: number; title: string; date: string }[];
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
  selector: 'app-chi-tiet-truyen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chi-tiet-truyen.component.html',
  styleUrl: './chi-tiet-truyen.component.css'
})
export class ChiTietTruyenComponent implements OnInit {
  story: Story | undefined;
  hotStories: Story[] = [];
  comments: Comment[] = [];
  newComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService
  ) {}

  ngOnInit() {
    const storyId = this.route.snapshot.paramMap.get('id')!;
    if (storyId) {
      this.loadStory(storyId);
      this.loadHotStories();
      this.loadComments(storyId);
    } else {
      this.router.navigate(['/tu-truyen']);
    }
  }

  loadStory(storyId: string) {
    this.storyService.getStoryById(storyId).subscribe({
      next: (story) => {
        if (story) {
          this.story = {
            _id: story._id,
            title: story.title,
            author: story.author,
            authorId: story.authorId,
            status: story.status,
            image: story.image,
            genres: story.genres || [],
            views: story.views || 0,
            chapters: story.chapters?.map((ch: any) => ({
              _id: ch._id,
              chapterNumber: ch.chapterNumber,
              title: ch.title,
              date: ch.date
            })) || [],
            description: story.description || ''
          };
        }
        if (!this.story) {
          console.error(`Không tìm thấy truyện với id: ${storyId}`);
          this.router.navigate(['/tu-truyen']);
        }
      },
      error: (err) => {
        console.error('Error fetching story:', err);
        this.router.navigate(['/tu-truyen']);
      }
    });
  }

  loadHotStories() {
    this.storyService.filterStories([], 'Truyện hot').subscribe({
      next: (stories) => {
        this.hotStories = stories.slice(0, 6).map((story: any) => ({
          _id: story._id,
          title: story.title,
          author: story.author,
          authorId: story.authorId,
          status: story.status,
          image: story.image,
          genres: story.genres || [],
          views: story.views || 0,
          chapters: story.chapters || [],
          description: story.description || ''
        }));
      },
      error: (err) => {
        console.error('Error fetching hot stories:', err);
        this.hotStories = [];
      }
    });
  }

  loadComments(storyId: string) {
    this.storyService.getStoryComments(storyId).subscribe({
      next: (comments) => {
        this.comments = comments.map((comment: any) => ({
          _id: comment._id,
          storyId: comment.storyId,
          chapterId: comment.chapterId || null,
          username: comment.username,
          content: comment.content,
          timestamp: comment.timestamp
        }));
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
        this.comments = [];
      }
    });
  }

  navigateToStoryDetail(storyId: string) {
    this.router.navigate(['/chi-tiet-truyen', storyId]);
  }

  navigateToAuthor(authorId: number) {
    this.router.navigate(['/author', authorId]);
  }

  navigateToReadChapter(chapterId: string) {
    if (this.story) {
      console.log('Navigating to read chapter - story:', this.story, 'chapterId:', chapterId);
      const chapter = this.story.chapters.find(ch => ch._id === chapterId);
      if (chapter) {
        console.log('Found chapter:', chapter);
        console.log('Navigating to:', ['/doc-truyen', this.story._id, chapter.chapterNumber]);
        this.router.navigate(['/doc-truyen', this.story._id, chapter.chapterNumber]);
      } else {
        console.error('Chapter not found for chapterId:', chapterId);
      }
    } else {
      console.error('Story is missing');
    }
  }

  addComment() {
    if (!this.story) {
      console.error('Story is undefined, cannot add comment');
      return;
    }
    if (!this.newComment.trim()) {
      console.error('Comment content is empty');
      return;
    }

    const comment = {
      storyId: this.story._id,
      username: 'User',
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
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }
}