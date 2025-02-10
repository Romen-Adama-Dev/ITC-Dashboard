import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatMenuButtonComponent } from './float-menu-button.component';

describe('FloatMenuButtonComponent', () => {
  let component: FloatMenuButtonComponent;
  let fixture: ComponentFixture<FloatMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatMenuButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
