import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoInputNumberBasicComponent } from './input.component';

describe('InputComponent', () => {
  let component: NzDemoInputNumberBasicComponent;
  let fixture: ComponentFixture<NzDemoInputNumberBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoInputNumberBasicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoInputNumberBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
