import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoPopconfirmPromiseComponent } from './popconfirm.component';

describe('PopconfirmComponent', () => {
  let component: NzDemoPopconfirmPromiseComponent;
  let fixture: ComponentFixture<NzDemoPopconfirmPromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoPopconfirmPromiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoPopconfirmPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
