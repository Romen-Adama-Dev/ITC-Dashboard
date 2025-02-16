import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHorizontalNavComponent } from './step-horizontal-nav.component';

describe('StepHorizontalNavComponent', () => {
  let component: StepHorizontalNavComponent;
  let fixture: ComponentFixture<StepHorizontalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepHorizontalNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepHorizontalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
