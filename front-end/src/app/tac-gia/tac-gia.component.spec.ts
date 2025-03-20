import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacGiaComponent } from './tac-gia.component';

describe('TacGiaComponent', () => {
  let component: TacGiaComponent;
  let fixture: ComponentFixture<TacGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TacGiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
