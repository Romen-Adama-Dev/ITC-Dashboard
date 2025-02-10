import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatShapeButtonComponent } from './float-shape-button.component';

describe('FloatShapeButtonComponent', () => {
  let component: FloatShapeButtonComponent;
  let fixture: ComponentFixture<FloatShapeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatShapeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatShapeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
