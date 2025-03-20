import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTacGiaComponent } from './chi-tiet-tac-gia.component';

describe('ChiTietTacGiaComponent', () => {
  let component: ChiTietTacGiaComponent;
  let fixture: ComponentFixture<ChiTietTacGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietTacGiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiTietTacGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
