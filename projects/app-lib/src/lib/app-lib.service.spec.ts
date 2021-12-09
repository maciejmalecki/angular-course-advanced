import { TestBed } from '@angular/core/testing';

import { AppLibService } from './app-lib.service';

describe('AppLibService', () => {
  let service: AppLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
