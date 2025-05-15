import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoProgressLineComponent } from './linear-bar.component';

describe('LinearBarComponent', () => {
  let component: NzDemoProgressLineComponent;
  let fixture: ComponentFixture<NzDemoProgressLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoProgressLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoProgressLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
