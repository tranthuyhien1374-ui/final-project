import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoDoiDonHangComponent } from './theo-doi-don-hang.component';

describe('TheoDoiDonHangComponent', () => {
  let component: TheoDoiDonHangComponent;
  let fixture: ComponentFixture<TheoDoiDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheoDoiDonHangComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheoDoiDonHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
