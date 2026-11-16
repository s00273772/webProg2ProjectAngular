import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerTrailCard } from './hiker-trail-card';

describe('HikerTrailCard', () => {
  let component: HikerTrailCard;
  let fixture: ComponentFixture<HikerTrailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerTrailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerTrailCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
