import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" *ngIf="isVisible">
      <div class="popup-content">
        <div class="icon" [ngClass]="{'success': type === 'success', 'error': type === 'error'}">
          <span>{{ type === 'success' ? '✔' : '✘' }}</span>
        </div>
        <h3>{{ title }}</h3>
        <p *ngIf="message">{{ message }}</p>
        <button class="close-btn" (click)="close()">ĐÓNG Ý</button>
      </div>
    </div>
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .popup-content {
      background: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      width: 300px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 10px;
      font-size: 24px;
    }
    .success {
      background: #28a745;
      color: white;
    }
    .error {
      background: #dc3545;
      color: white;
    }
    h3 {
      font-size: 20px;
      margin: 10px 0;
      text-transform: uppercase;
    }
    p {
      font-size: 14px;
      color: #666;
      margin-bottom: 20px;
    }
    .close-btn {
      width: 100%;
      padding: 10px;
      background: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 14px;
    }
    .close-btn:hover {
      background: #555;
    }
  `]
})
export class PopupComponent {
  @Input() isVisible: boolean = false;
  @Input() type: 'success' | 'error' = 'success';
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.isVisible = false;
    this.onClose.emit();
  }
}