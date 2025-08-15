import { TestBed } from '@angular/core/testing';

import { NgxTusUploaderService } from './ngx-tus-uploader.service';

describe('NgxTusUploaderService', () => {
  let service: NgxTusUploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTusUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
