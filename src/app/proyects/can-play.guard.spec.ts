import { TestBed } from '@angular/core/testing';

import { CanPlayGuard } from './can-play.guard';

describe('CanPlayGuard', () => {
  let guard: CanPlayGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanPlayGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
