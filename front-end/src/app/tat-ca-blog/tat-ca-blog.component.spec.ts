import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TatCaBlogComponent } from './tat-ca-blog.component';

describe('TatCaBlogComponent', () => {
  let component: TatCaBlogComponent;
  let fixture: ComponentFixture<TatCaBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TatCaBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TatCaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
