import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerTrailDetails } from './hiker-trail-details';

describe('HikerTrailDetails', () => {
  let component: HikerTrailDetails;
  let fixture: ComponentFixture<HikerTrailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerTrailDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerTrailDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
