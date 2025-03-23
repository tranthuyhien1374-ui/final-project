import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import CSS của AOS

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

    AOS.init({
      duration: 1000, // Thời gian hiệu ứng (ms)
      once: true, // Chỉ chạy hiệu ứng một lần
    });
  }
}

