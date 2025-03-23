import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showHeaderFooter: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Lắng nghe sự kiện thay đổi route
    console.log('AppComponent loaded');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra route hiện tại
        this.showHeaderFooter = !event.urlAfterRedirects.startsWith('/dang-nhap');
      }
    });
  }

}