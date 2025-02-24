import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatChartComponent } from './heat-chart.component';

describe('HeatChartComponent', () => {
  let component: HeatChartComponent;
  let fixture: ComponentFixture<HeatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
