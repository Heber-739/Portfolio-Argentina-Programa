import { TestBed } from '@angular/core/testing';

import { HardSkillService } from './hard-skill.service';

describe('HardSkillService', () => {
  let service: HardSkillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardSkillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
