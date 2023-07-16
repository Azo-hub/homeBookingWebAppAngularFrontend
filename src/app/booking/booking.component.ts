import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Booking } from '../model/booking';
import { User } from '../model/user';
import { BookingService } from '../service/booking.service';
import { NotificationService } from '../service/notification.service';
import { PaymentMethod } from '../model/payment-method';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking-payment-method',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  bookingCheckInDate: Date = new Date;
  bookingCheckOutDate: Date = new Date;
  bookingNoOfDaysFromUrl: string = "";
  bookingPropertyIdFromUrl: string = "";
  bookingCheckInDateFromUrl: string = "";
  bookingCheckOutDateFromUrl: string = "";
  userId: number = 0;
  noOfGuest: string = "";
  noOfChildren: string = "";
  pets: string = "";
  bookingFirstName: any;
  bookingLastName: any;
  bookingEmail: any;
  bookingHomePhoneNumber: any;
  bookingPhoneNumber: any;
  bookingCountry: any;
  bookingState: any;
  bookingStreet: any;
  bookingCity: any;
  bookingZipCode: any;
  showNewBookingSection: boolean;
  showPaymentMethodSection: boolean;
  showCreditCardPaymentInfoError: boolean;
  showBillingAddressSection: boolean = false;
  hideShowBillingAddressButton: boolean;
  paymentMethodList: PaymentMethod[] = [];
  showPaymentCardForm: boolean = false;
  showPaymentCardList: boolean = false;
  paymentMethod: PaymentMethod = new PaymentMethod;
  bookingPaymentMethodId: number;




  constructor(private notificationService: NotificationService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService) { }

  ngOnInit(): void {

    this.bookingNoOfDaysFromUrl = this.activatedRoute.snapshot.paramMap.get("noOfDays");
    this.bookingPropertyIdFromUrl = this.activatedRoute.snapshot.paramMap.get("id");
    this.bookingCheckInDateFromUrl = this.activatedRoute.snapshot.paramMap.get("checkInDate");
    this.bookingCheckOutDateFromUrl = this.activatedRoute.snapshot.paramMap.get("checkOutDate");
    this.noOfGuest = this.activatedRoute.snapshot.paramMap.get("noOfGuest");
    this.noOfChildren = this.activatedRoute.snapshot.paramMap.get("noOfChildren");
    this.pets = this.activatedRoute.snapshot.paramMap.get("pets");
    this.getAllPaymentMethod();
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



  onSubmitAddADifferentCardForm(addADifferentCardForm: NgForm): void {
    this.showLoading = true;

    const formData = this.bookingService.createNewCardFormData(addADifferentCardForm.value.cardType,
      addADifferentCardForm.value.cardHolderName, addADifferentCardForm.value.cardExpiryMonth,
      addADifferentCardForm.value.cardExpiryYear, addADifferentCardForm.value.cardNumber,
      addADifferentCardForm.value.cardCVC);

    this.subscriptions.push(

      this.bookingService.addPaymentCard(formData).subscribe(
        (response: PaymentMethod) => {
          this.paymentMethod = response;
          this.bookingPaymentMethodId = response.id;
          this.showLoading = false;
          this.showBillingAddressSection = true;
          this.hideShowBillingAddressButton = true;

        },
        (errorResponse: HttpErrorResponse) => {

          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  public onBookingPaymentForm(): void {
    this.showLoading = true;

    this.bookingPropertyIdFromUrl
    this.bookingCheckInDate = new Date(this.bookingCheckInDateFromUrl);
    this.bookingCheckOutDate = new Date(this.bookingCheckOutDateFromUrl);
    const formData =
      this.bookingService.createBookingFormData(this.bookingFirstName,
        this.bookingLastName, this.bookingEmail, this.bookingHomePhoneNumber,
        this.bookingPhoneNumber, this.bookingCountry, this.bookingState, this.bookingStreet,
        this.bookingCity, this.bookingZipCode,
        this.bookingCheckInDate, this.bookingCheckOutDate, this.bookingNoOfDaysFromUrl,
        this.bookingPropertyIdFromUrl, this.noOfGuest, this.noOfChildren, this.pets, this.bookingPaymentMethodId);

    this.subscriptions.push(

      this.bookingService.newBooking(formData).subscribe(
        (response: Booking) => {
          this.showNewBookingSection = true;
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Property Booked Successfully! Check your email for follow-up messages.`);
          this.router.navigateByUrl(`/orderDetails/${response.id}`);
        },
        (errorResponse: HttpErrorResponse) => {

          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }



  onClickUseADifferentCard(): void {
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
          this.bookingPaymentMethodId = id;
          this.sendNotification(NotificationType.SUCCESS, "Payment Card set successfully!");
          this.showNewBookingSection = true;
          this.showPaymentCardList = true;
        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);

        }

      )
    );

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
      this.paymentMethod.id);

    this.subscriptions.push(
      this.bookingService.addNewBillingAddress(formData).subscribe(
        (response: PaymentMethod) => {
          this.paymentMethod = response;
          this.bookingPaymentMethodId = this.paymentMethod.id;
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Payment Details Successfully Added.`);
          this.showNewBookingSection = true;
          this.showPaymentCardForm = false;

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


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
