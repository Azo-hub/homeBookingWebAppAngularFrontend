import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingProperty1Component } from './listing-property1.component';

describe('ListingProperty1Component', () => {
  let component: ListingProperty1Component;
  let fixture: ComponentFixture<ListingProperty1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingProperty1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProperty1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
