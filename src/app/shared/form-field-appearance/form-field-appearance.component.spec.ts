import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldAppearanceComponent } from './form-field-appearance.component';

describe('FormFieldAppearanceComponent', () => {
  let component: FormFieldAppearanceComponent;
  let fixture: ComponentFixture<FormFieldAppearanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldAppearanceComponent]
    });
    fixture = TestBed.createComponent(FormFieldAppearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
