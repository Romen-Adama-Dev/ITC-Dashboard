import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizedVerticalBarChartComponent } from './normalized-vertical-bar-chart.component';

describe('NormalizedVerticalBarChartComponent', () => {
  let component: NormalizedVerticalBarChartComponent;
  let fixture: ComponentFixture<NormalizedVerticalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalizedVerticalBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalizedVerticalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
