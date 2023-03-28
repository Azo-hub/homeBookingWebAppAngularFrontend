import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyDetailsOwnerComponent } from './add-property-details-owner.component';

describe('AddPropertyDetailsOwnerComponent', () => {
  let component: AddPropertyDetailsOwnerComponent;
  let fixture: ComponentFixture<AddPropertyDetailsOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyDetailsOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyDetailsOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
