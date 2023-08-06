import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNewsComponent } from './details-news.component';

describe('DetailsNewsComponent', () => {
  let component: DetailsNewsComponent;
  let fixture: ComponentFixture<DetailsNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsNewsComponent]
    });
    fixture = TestBed.createComponent(DetailsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
