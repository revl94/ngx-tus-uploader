import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTusUploaderComponent } from './ngx-tus-uploader.component';

describe('NgxTusUploaderComponent', () => {
  let component: NgxTusUploaderComponent;
  let fixture: ComponentFixture<NgxTusUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTusUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTusUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
