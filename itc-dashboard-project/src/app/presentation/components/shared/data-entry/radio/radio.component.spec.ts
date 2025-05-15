import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedRadioGroupComponent } from './radio.component';

describe('RadioComponent', () => {
  let component: UnifiedRadioGroupComponent;
  let fixture: ComponentFixture<UnifiedRadioGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedRadioGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
