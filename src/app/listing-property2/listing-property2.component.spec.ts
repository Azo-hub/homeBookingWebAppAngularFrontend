import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingProperty2Component } from './listing-property2.component';

describe('ListingProperty2Component', () => {
  let component: ListingProperty2Component;
  let fixture: ComponentFixture<ListingProperty2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingProperty2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingProperty2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
