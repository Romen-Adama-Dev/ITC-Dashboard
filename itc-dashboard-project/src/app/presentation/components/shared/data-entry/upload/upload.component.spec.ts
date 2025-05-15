import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzDemoUploadDefaultFileListComponent } from './upload.component';

describe('UploadComponent', () => {
  let component: NzDemoUploadDefaultFileListComponent;
  let fixture: ComponentFixture<NzDemoUploadDefaultFileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzDemoUploadDefaultFileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzDemoUploadDefaultFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
