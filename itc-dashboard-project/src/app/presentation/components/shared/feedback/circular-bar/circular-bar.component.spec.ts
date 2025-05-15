import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoProgressFormatComponent } from './circular-bar.component';

describe('CircularBarComponent', () => {
  let component: NzDemoProgressFormatComponent;
  let fixture: ComponentFixture<NzDemoProgressFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoProgressFormatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoProgressFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
