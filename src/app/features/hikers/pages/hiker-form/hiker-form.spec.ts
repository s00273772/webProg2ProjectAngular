import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HikerForm } from './hiker-form';

describe('HikerForm', () => {
  let component: HikerForm;
  let fixture: ComponentFixture<HikerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HikerForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HikerForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
