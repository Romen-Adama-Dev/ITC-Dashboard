import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearBarComponent } from './linear-bar.component';

describe('LinearBarComponent', () => {
  let component: LinearBarComponent;
  let fixture: ComponentFixture<LinearBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinearBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
