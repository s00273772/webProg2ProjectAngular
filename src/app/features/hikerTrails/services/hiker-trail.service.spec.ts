import { TestBed } from '@angular/core/testing';
import { HikerTrailService } from './hiker-trail.service';

describe('HikerTrailService', () => {
  let service: HikerTrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HikerTrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
