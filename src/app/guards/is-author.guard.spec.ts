import { TestBed } from '@angular/core/testing';

import { isAuthorGuard } from './is-author.guard';

describe('IsAuthorGuard', () => {
  let guard: isAuthorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(isAuthorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
