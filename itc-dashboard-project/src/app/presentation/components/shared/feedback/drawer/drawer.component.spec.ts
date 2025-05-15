import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoDrawerFromDrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: NzDemoDrawerFromDrawerComponent;
  let fixture: ComponentFixture<NzDemoDrawerFromDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoDrawerFromDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoDrawerFromDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
