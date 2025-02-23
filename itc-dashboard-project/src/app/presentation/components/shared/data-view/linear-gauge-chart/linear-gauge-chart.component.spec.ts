import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGaugeChartComponent } from './linear-gauge-chart.component';

describe('LinearGaugeChartComponent', () => {
  let component: LinearGaugeChartComponent;
  let fixture: ComponentFixture<LinearGaugeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinearGaugeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearGaugeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
