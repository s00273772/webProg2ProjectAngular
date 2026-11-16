import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerDetails } from './hiker-details';

describe('HikerDetails', () => {
  let component: HikerDetails;
  let fixture: ComponentFixture<HikerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
