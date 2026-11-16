import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerCard } from './hiker-card';

describe('HikerCard', () => {
  let component: HikerCard;
  let fixture: ComponentFixture<HikerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
