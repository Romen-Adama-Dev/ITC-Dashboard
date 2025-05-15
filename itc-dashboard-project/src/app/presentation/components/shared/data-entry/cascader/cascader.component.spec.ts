import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoCascaderMultipleComponent } from './cascader.component';

describe('CascaderComponent', () => {
  let component: NzDemoCascaderMultipleComponent;
  let fixture: ComponentFixture<NzDemoCascaderMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoCascaderMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoCascaderMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
