import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPieChartComponent } from './advanced-pie-chart.component';

describe('AdvancedPieChartComponent', () => {
  let component: AdvancedPieChartComponent;
  let fixture: ComponentFixture<AdvancedPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedPieChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvancedPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
