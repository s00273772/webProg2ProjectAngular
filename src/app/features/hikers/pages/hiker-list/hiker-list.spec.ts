import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerList } from './hiker-list';

describe('HikerList', () => {
  let component: HikerList;
  let fixture: ComponentFixture<HikerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerList],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
