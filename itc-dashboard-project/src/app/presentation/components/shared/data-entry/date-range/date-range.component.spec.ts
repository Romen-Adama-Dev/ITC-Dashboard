import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoDatePickerRangePickerComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let component: NzDemoDatePickerRangePickerComponent;
  let fixture: ComponentFixture<NzDemoDatePickerRangePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoDatePickerRangePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoDatePickerRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
