import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerTrailList } from './hiker-trail-list';

describe('HikerTrailList', () => {
  let component: HikerTrailList;
  let fixture: ComponentFixture<HikerTrailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerTrailList],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerTrailList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
