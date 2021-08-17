import {TestBed} from '@angular/core/testing';

import {PreDefinedCourseStoreService} from './pre-defined-course-store.service';

describe('PreDefinedCourseStoreService', () => {
  let service: PreDefinedCourseStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreDefinedCourseStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
