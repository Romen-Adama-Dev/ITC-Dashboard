import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressGradientComponent } from './custom-bar.component';

describe('CustomBarComponent', () => {
  let component: ProgressGradientComponent;
  let fixture: ComponentFixture<ProgressGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressGradientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
