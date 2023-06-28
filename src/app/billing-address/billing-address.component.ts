import { Component, Input, OnInit } from '@angular/core';
import { PaymentMethod } from '../model/payment-method';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgForm } from '@angular/forms';
import { BookingService } from '../service/booking.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {

  @Input()
  showBillingSectionFromParent: boolean = false;
  paymentMethod: PaymentMethod = new PaymentMethod;
  private subscriptions: Subscription[] = [];
  showLoading: boolean;

  @Input()
  paymentMethodIdFromParent: number;

  constructor(private notificationService: NotificationService, private bookingService: BookingService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadBillingAddress();
  }

  loadBillingAddress(): void {

  }

  onSubmitBillingAddressForm(billingAddressForm: NgForm): void {
    this.showLoading = true;

    const formData = this.bookingService.createBillingAddressFormData(
      billingAddressForm.value.paymentMethodBillingAddressLine1,
      billingAddressForm.value.paymentMethodBillingAddressLine2,
      billingAddressForm.value.paymentMethodBillingCity,
      billingAddressForm.value.paymentMethodBillingState,
      billingAddressForm.value.paymentMethodBillingZipCode,
      billingAddressForm.value.paymentMethodBillingCountry,
      this.paymentMethodIdFromParent)

    this.subscriptions.push(
      this.bookingService.addBillingAddress(formData).subscribe(
        (response: PaymentMethod) => {
          this.paymentMethod = response;
          this.showLoading = false;
          this.router.navigateByUrl("/userProfile")
          this.sendNotification(NotificationType.SUCCESS, `Payment Details Successfully Added.`);

        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
        }



      )
    );

  }


  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType,
        "An error occurred. Please Try Again Later");
    }
  }

}
