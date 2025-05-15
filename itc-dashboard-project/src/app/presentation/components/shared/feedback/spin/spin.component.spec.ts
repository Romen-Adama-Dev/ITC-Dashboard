import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoSpinBasicComponent } from './spin.component';

describe('SpinComponent', () => {
  let component: NzDemoSpinBasicComponent;
  let fixture: ComponentFixture<NzDemoSpinBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoSpinBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoSpinBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
