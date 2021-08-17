import {TestBed} from '@angular/core/testing';

import {PreDefinedCourseService} from './pre-defined-course.service';

describe('PreDefinedCourseService', () => {
  let service: PreDefinedCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreDefinedCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
