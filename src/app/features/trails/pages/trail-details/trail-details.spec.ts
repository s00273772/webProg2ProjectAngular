import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailDetails } from './trail-details';

describe('TrailDetails', () => {
  let component: TrailDetails;
  let fixture: ComponentFixture<TrailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(TrailDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
