import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeChartComponent } from './tree-chart.component';

describe('TreeChartComponent', () => {
  let component: TreeChartComponent;
  let fixture: ComponentFixture<TreeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
