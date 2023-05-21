import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Booking } from '../model/booking';
import { User } from '../model/user';
import { BookingService } from '../service/booking.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-booking-payment-method',
  templateUrl: './booking-payment-method.component.html',
  styleUrls: ['./booking-payment-method.component.css']
})
export class BookingPaymentMethodComponent implements OnInit, OnDestroy {
  
  showLoading: boolean = false; 
  private subscriptions: Subscription [] = [];
  bookingCheckInDate: Date = new Date;
  bookingCheckOutDate: Date = new Date;
  bookingNoOfDaysFromUrl:string = "";
  bookingPropertyIdFromUrl:string = "";
  bookingCheckInDateFromUrl:string = "";
  bookingCheckOutDateFromUrl:string = "";
  userId:number = 0;
  noOfGuest:string = "";
  noOfChildren:string = "";
  pets:string = "";
  bookingFirstName:any;
  bookingLastName:any;
  bookingEmail:any;
  bookingHomePhoneNumber:any;
  bookingPhoneNumber:any;
  bookingCountry:any;
  bookingState:any;
  bookingStreet:any;
  bookingCity:any;
  bookingZipCode:any;
  

  constructor(private notificationService: NotificationService, private router: Router,
    private activatedRoute: ActivatedRoute, 
    private bookingService:BookingService) { }

  ngOnInit(): void {
    
    this.bookingNoOfDaysFromUrl = this.activatedRoute.snapshot.paramMap.get("noOfDays");
    this.bookingPropertyIdFromUrl = this.activatedRoute.snapshot.paramMap.get("id");
    this.bookingCheckInDateFromUrl = this.activatedRoute.snapshot.paramMap.get("checkInDate");
    this.bookingCheckOutDateFromUrl = this.activatedRoute.snapshot.paramMap.get("checkOutDate");
    this.noOfGuest = this.activatedRoute.snapshot.paramMap.get("noOfGuest");
    this.noOfChildren = this.activatedRoute.snapshot.paramMap.get("noOfChildren");
    this.pets = this.activatedRoute.snapshot.paramMap.get("pets");
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
            this.bookingCity,this.bookingZipCode,  
            this.bookingCheckInDate, this.bookingCheckOutDate, this.bookingNoOfDaysFromUrl,
            this.bookingPropertyIdFromUrl, this.noOfGuest, this.noOfChildren, this.pets);
    
    this.subscriptions.push(
      
      this.bookingService.newBooking(formData).subscribe(
        (response: Booking) => {
          
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
