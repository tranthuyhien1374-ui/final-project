import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatCaTruyenComponent } from './tat-ca-truyen.component';

describe('TatCaTruyenComponent', () => {
  let component: TatCaTruyenComponent;
  let fixture: ComponentFixture<TatCaTruyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatCaTruyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatCaTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
