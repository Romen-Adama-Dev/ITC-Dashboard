import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoModalAsyncComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: NzDemoModalAsyncComponent;
  let fixture: ComponentFixture<NzDemoModalAsyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoModalAsyncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoModalAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
