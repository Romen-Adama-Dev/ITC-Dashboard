import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentGaugeChartComponent } from './percent-gauge-chart.component';

describe('PercentGaugeChartComponent', () => {
  let component: PercentGaugeChartComponent;
  let fixture: ComponentFixture<PercentGaugeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentGaugeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentGaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
