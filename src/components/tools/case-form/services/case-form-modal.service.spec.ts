import { TestBed } from '@angular/core/testing';

import { CaseFormModalService } from './case-form-modal.service';

describe('CaseFormModalService', () => {
  let service: CaseFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
