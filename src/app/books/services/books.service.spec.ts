import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import {HttpClient} from "@angular/common/http";

describe('BooksService', () => {
  let service: BooksService;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {};
    TestBed.configureTestingModule({
      providers: [BooksService, {provide: HttpClient, useValue: httpClientMock}]
    });
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
