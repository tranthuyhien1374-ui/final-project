import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhToanChuyenKhoanComponent } from './thanh-toan-chuyen-khoan.component';

describe('ThanhToanChuyenKhoanComponent', () => {
  let component: ThanhToanChuyenKhoanComponent;
  let fixture: ComponentFixture<ThanhToanChuyenKhoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhToanChuyenKhoanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhToanChuyenKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
