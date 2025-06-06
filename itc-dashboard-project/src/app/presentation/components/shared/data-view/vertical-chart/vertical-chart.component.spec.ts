import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBarChartComponent } from './vertical-chart.component';

describe('VerticalChartComponent', () => {
  let component: VerticalBarChartComponent;
  let fixture: ComponentFixture<VerticalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerticalBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
