import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutLienHeComponent } from './nut-lien-he.component';

describe('NutLienHeComponent', () => {
  let component: NutLienHeComponent;
  let fixture: ComponentFixture<NutLienHeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutLienHeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutLienHeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
