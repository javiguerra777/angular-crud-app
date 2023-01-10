import { TestBed } from '@angular/core/testing';

import { LocalStorageGuard } from './localstorage.guard';

describe('LocalstorageGuard', () => {
  let guard: LocalStorageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocalStorageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
