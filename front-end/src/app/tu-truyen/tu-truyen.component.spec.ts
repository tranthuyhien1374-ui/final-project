import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuTruyenComponent } from './tu-truyen.component';

describe('TuTruyenComponent', () => {
  let component: TuTruyenComponent;
  let fixture: ComponentFixture<TuTruyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuTruyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
