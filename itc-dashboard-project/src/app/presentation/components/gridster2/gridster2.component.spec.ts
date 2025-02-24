import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridster2Component } from './gridster2.component';

describe('Gridster2Component', () => {
  let component: Gridster2Component;
  let fixture: ComponentFixture<Gridster2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gridster2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gridster2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
