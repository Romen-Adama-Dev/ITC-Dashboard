import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepVerticalNavComponent } from './step-vertical-nav.component';

describe('StepVerticalNavComponent', () => {
  let component: StepVerticalNavComponent;
  let fixture: ComponentFixture<StepVerticalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepVerticalNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepVerticalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
