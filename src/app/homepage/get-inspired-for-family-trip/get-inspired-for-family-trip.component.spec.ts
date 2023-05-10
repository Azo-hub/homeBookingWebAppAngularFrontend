import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInspiredForFamilyTripComponent } from './get-inspired-for-family-trip.component';

describe('GetInspiredForFamilyTripComponent', () => {
  let component: GetInspiredForFamilyTripComponent;
  let fixture: ComponentFixture<GetInspiredForFamilyTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetInspiredForFamilyTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInspiredForFamilyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
