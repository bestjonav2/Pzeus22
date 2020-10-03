import { TestBed } from '@angular/core/testing';

import { LookService } from './look.service';

describe('LookService', () => {
  let service: LookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
