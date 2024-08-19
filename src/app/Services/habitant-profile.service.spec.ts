import { TestBed } from '@angular/core/testing';

import { HabitantProfileService } from './habitant-profile.service';

describe('HabitantProfileService', () => {
  let service: HabitantProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitantProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
