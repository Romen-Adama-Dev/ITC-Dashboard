import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedMessageDemoComponent } from './message.component';

describe('MessageComponent', () => {
  let component: UnifiedMessageDemoComponent;
  let fixture: ComponentFixture<UnifiedMessageDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedMessageDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedMessageDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
