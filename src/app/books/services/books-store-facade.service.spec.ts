import { TestBed } from '@angular/core/testing';

import { BooksStoreFacade } from './books-store-facade.service';

describe('BooksStoreFacadeService', () => {
  let service: BooksStoreFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksStoreFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
