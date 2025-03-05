import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioSelectorComponent } from './radio-selector.component';

describe('RadioSelectorComponent', () => {
  let component: RadioSelectorComponent;
  let fixture: ComponentFixture<RadioSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
