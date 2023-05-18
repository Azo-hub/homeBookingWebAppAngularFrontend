import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPropertyOwnerComponent } from './contact-property-owner.component';

describe('ContactPropertyOwnerComponent', () => {
  let component: ContactPropertyOwnerComponent;
  let fixture: ComponentFixture<ContactPropertyOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactPropertyOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPropertyOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
