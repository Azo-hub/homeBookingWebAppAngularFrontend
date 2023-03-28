import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingProperty3Component } from './listing-property3.component';

describe('ListingProperty3Component', () => {
  let component: ListingProperty3Component;
  let fixture: ComponentFixture<ListingProperty3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingProperty3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProperty3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
