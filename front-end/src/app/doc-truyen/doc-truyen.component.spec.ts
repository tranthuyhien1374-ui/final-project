import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTruyenComponent } from './doc-truyen.component';

describe('DocTruyenComponent', () => {
  let component: DocTruyenComponent;
  let fixture: ComponentFixture<DocTruyenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocTruyenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocTruyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
