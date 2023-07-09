import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingService } from '../service/booking.service';
import { PaymentMethod } from '../model/payment-method';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  showBilling: boolean = false;
  private subscriptions: Subscription[] = [];
  paymentCard: PaymentMethod = new PaymentMethod;
  paymentMethodList: PaymentMethod[] = [];

  @Input()
  showPaymentMethodSectionFromParant: boolean;

  @Output()
  showBillingBtnPressed: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Output()
  paymentCardId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private bookingService: BookingService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.showPaymentMethodSectionFromParant = true;
    this.getAllPaymentMethod();

  }

  onSubmitPaymentCardForm(paymentCardForm: NgForm): void {
    this.showLoading = true;

    const formData = this.bookingService.createNewCardFormData(paymentCardForm.value.cardType,
      paymentCardForm.value.cardHolderName, paymentCardForm.value.cardExpiryMonth,
      paymentCardForm.value.cardExpiryYear, paymentCardForm.value.cardNumber, paymentCardForm.value.cardCVC)

    this.subscriptions.push(
      this.bookingService.addPaymentCard(formData).subscribe(
        (response: PaymentMethod) => {
          this.paymentCard = response;
          this.showLoading = false;
          this.showBilling = true;
          this.showBillingBtnPressed.emit(this.showBilling);
          this.paymentCardId.emit(response.id);

        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
          this.showLoading = false;
        }



      )
    );





  }



  getAllPaymentMethod(): void {
    this.subscriptions.push(
      this.bookingService.getAllPaymentMethod().subscribe(
        (response: PaymentMethod[]) => {
          this.paymentMethodList = response;

        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);

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



  ngOnDestroy(): void {

  }


}
