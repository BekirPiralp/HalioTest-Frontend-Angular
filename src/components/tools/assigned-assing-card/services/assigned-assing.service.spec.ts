import { TestBed } from '@angular/core/testing';

import { AssignedAssingService } from './assigned-assing.service';

describe('AssignedAssingService', () => {
  let service: AssignedAssingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignedAssingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
