import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashedButtonComponent } from './dashed-button.component';

describe('DashedButtonComponent', () => {
  let component: DashedButtonComponent;
  let fixture: ComponentFixture<DashedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashedButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
