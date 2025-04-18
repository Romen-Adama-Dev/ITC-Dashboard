import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalChartComponent } from './horizontal-chart.component';

describe('HorizontalChartComponent', () => {
  let component: HorizontalChartComponent;
  let fixture: ComponentFixture<HorizontalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
