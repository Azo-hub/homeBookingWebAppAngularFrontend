import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPaymentMethodComponent } from './booking-payment-method.component';

describe('BookingPaymentMethodComponent', () => {
  let component: BookingPaymentMethodComponent;
  let fixture: ComponentFixture<BookingPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
