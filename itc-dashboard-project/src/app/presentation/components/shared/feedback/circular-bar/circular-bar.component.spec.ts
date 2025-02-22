import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularBarComponent } from './circular-bar.component';

describe('CircularBarComponent', () => {
  let component: CircularBarComponent;
  let fixture: ComponentFixture<CircularBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
