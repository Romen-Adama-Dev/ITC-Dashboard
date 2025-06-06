import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeMapComponent } from './tree-chart.component';

describe('TreeChartComponent', () => {
  let component: TreeMapComponent;
  let fixture: ComponentFixture<TreeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
