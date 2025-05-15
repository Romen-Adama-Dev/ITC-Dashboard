import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifiedSkeletonDemoComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: UnifiedSkeletonDemoComponent;
  let fixture: ComponentFixture<UnifiedSkeletonDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifiedSkeletonDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnifiedSkeletonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
