import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTruyenComponent } from './chi-tiet-truyen.component';

describe('ChiTietTruyenComponent', () => {
  let component: ChiTietTruyenComponent;
  let fixture: ComponentFixture<ChiTietTruyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietTruyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
