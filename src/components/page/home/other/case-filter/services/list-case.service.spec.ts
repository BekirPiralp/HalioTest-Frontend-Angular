import { TestBed } from '@angular/core/testing';

import { ListCaseService } from './list-case.service';

describe('ListCaseService', () => {
  let service: ListCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
