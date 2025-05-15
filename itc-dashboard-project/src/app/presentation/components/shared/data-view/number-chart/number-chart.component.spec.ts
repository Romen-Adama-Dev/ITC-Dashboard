import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberCardsComponent } from './number-chart.component';

describe('NumberChartComponent', () => {
  let component: NumberCardsComponent;
  let fixture: ComponentFixture<NumberCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
