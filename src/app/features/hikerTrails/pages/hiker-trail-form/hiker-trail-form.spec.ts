import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerTrailForm } from './hiker-trail-form';

describe('HikerTrailForm', () => {
  let component: HikerTrailForm;
  let fixture: ComponentFixture<HikerTrailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerTrailForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerTrailForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
