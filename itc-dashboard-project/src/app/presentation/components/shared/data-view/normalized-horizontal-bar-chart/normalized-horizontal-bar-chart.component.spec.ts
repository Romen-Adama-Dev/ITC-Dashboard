import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizedHorizontalBarChartComponent } from './normalized-horizontal-bar-chart.component';

describe('NormalizedHorizontalBarChartComponent', () => {
  let component: NormalizedHorizontalBarChartComponent;
  let fixture: ComponentFixture<NormalizedHorizontalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormalizedHorizontalBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalizedHorizontalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
