import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartSelectionModalComponent } from './chart-selection-modal.component';

describe('ChartSelectionModalComponent', () => {
  let fixture: ComponentFixture<ChartSelectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSelectionModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSelectionModalComponent);
    fixture.detectChanges();
  });
});