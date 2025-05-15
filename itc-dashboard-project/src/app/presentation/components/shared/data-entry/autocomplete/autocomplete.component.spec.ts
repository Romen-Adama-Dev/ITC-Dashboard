import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoAutoCompleteUncertainCategoryComponent } from './autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: NzDemoAutoCompleteUncertainCategoryComponent;
  let fixture: ComponentFixture<NzDemoAutoCompleteUncertainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoAutoCompleteUncertainCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoAutoCompleteUncertainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
