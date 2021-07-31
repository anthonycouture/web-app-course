import {TestBed} from '@angular/core/testing';

import {SpinnerStoreService} from './spinner-store.service';

describe('SpinnerStoreService', () => {
  let service: SpinnerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
