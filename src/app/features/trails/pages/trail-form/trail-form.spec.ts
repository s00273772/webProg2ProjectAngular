import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailForm } from './trail-form';

describe('TrailForm', () => {
  let component: TrailForm;
  let fixture: ComponentFixture<TrailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
