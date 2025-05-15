import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoSliderIconSliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: NzDemoSliderIconSliderComponent;
  let fixture: ComponentFixture<NzDemoSliderIconSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoSliderIconSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoSliderIconSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
