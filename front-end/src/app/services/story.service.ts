import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Story {
  _id: string;
  title: string;
  author: string;
  authorId: number;
  status: string;
  image: string;
  genres: string[];
  views: number;
  description: string;
  chapters?: { _id: string; chapterNumber: number; title: string; date: string }[];
}

interface Chapter {
  _id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string;
  date: string;
}

// Interface cho bình luận mới (không có _id)
interface NewComment {
  storyId: string;
  chapterId?: string | null;
  username: string;
  content: string;
  timestamp: string;
}

// Interface cho bình luận đã có (bao gồm _id)
interface Comment {
  _id: string;
  storyId: string;
  chapterId?: string | null;
  username: string;
  content: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${this.apiUrl}/stories`);
  }

  getStoryById(id: string): Observable<Story> {
    return this.http.get<Story>(`${this.apiUrl}/stories/${id}`);
  }

  getChapter(storyId: string, chapterNumber: number): Observable<Chapter> {
    return this.http.get<Chapter>(`${this.apiUrl}/stories/${storyId}/chapters/${chapterNumber}`);
  }

  getStoryComments(storyId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/stories/${storyId}/comments`);
  }

  getChapterComments(storyId: string, chapterId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/stories/${storyId}/chapters/${chapterId}/comments`);
  }

  filterStories(genres?: string[], status?: string, progress?: string): Observable<Story[]> {
    let params = new HttpParams();
    if (genres && genres.length > 0) {
      params = params.set('genres', genres.join(','));
    }
    if (status) {
      params = params.set('status', status);
    }
    if (progress) {
      params = params.set('progress', progress);
    }
    console.log('Filter params:', { genres, status, progress });
    return this.http.get<Story[]>(`${this.apiUrl}/stories/filter`, { params });
  }

  // Sửa addComment để nhận NewComment và trả về Comment
  addComment(comment: NewComment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }
}