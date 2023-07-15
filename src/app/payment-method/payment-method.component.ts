import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookingService } from '../service/booking.service';
import { PaymentMethod } from '../model/payment-method';
import { NotificationType } from '../enum/notification-type.enum';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpResponse } from '../model/custom-http-response';


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
  showPaymentCardForm: boolean = false;
  showPaymentCardList: boolean = false;

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


  onClickAddNewCard(): void {
    this.showPaymentCardList = true;
    this.showPaymentCardForm = true;

  }

  onClickPaymentMethodRadioBtn(id: number, value: boolean): void {

    const formData = new FormData();
    formData.append("paymentMethodId", id.toString());
    formData.append("value", value.toString());

    this.subscriptions.push(
      this.bookingService.setDefaultPaymentMethod(formData).subscribe(
        (response: PaymentMethod[]) => {
          this.paymentMethodList = response;
          this.sendNotification(NotificationType.SUCCESS, "Default Payment Card set successfully!");
        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);

        }

      )
    );

  }

  onRemoveCard(id: number): void {
    const formData = new FormData();
    formData.append("paymentMethodId", id.toString());

    this.subscriptions.push(
      this.bookingService.removeCard(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getAllPaymentMethod();
        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);

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
