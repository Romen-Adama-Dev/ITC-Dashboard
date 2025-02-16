import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineNavComponent } from './inline-nav.component';

describe('InlineNavComponent', () => {
  let component: InlineNavComponent;
  let fixture: ComponentFixture<InlineNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
