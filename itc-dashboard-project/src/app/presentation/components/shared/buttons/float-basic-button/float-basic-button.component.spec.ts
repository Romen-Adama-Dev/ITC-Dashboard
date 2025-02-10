import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatBasicButtonComponent } from './float-basic-button.component';

describe('FloatBasicButtonComponent', () => {
  let component: FloatBasicButtonComponent;
  let fixture: ComponentFixture<FloatBasicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatBasicButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatBasicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
