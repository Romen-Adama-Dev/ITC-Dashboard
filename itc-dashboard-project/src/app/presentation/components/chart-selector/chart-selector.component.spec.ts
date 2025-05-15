import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSelectorVanillaComponent } from './chart-selector.component';

describe('ChartSelectorComponent', () => {
  let component: ChartSelectorVanillaComponent;
  let fixture: ComponentFixture<ChartSelectorVanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSelectorVanillaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSelectorVanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
