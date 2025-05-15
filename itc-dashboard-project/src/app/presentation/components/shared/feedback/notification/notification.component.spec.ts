import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedNotificationDemoComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: UnifiedNotificationDemoComponent;
  let fixture: ComponentFixture<UnifiedNotificationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedNotificationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedNotificationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
