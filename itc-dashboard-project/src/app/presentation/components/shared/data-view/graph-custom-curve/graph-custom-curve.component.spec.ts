import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCustomCurveComponent } from './graph-custom-curve.component';

describe('GraphCustomCurveComponent', () => {
  let component: GraphCustomCurveComponent;
  let fixture: ComponentFixture<GraphCustomCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphCustomCurveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphCustomCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
