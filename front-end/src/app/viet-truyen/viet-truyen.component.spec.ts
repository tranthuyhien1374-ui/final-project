import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VietTruyenComponent } from './viet-truyen.component';

describe('VietTruyenComponent', () => {
  let component: VietTruyenComponent;
  let fixture: ComponentFixture<VietTruyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VietTruyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VietTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
