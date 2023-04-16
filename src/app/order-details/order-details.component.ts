import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from '../model/booking';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BookingService } from '../service/booking.service';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type.enum';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  bookingIdFromUrl:string;
  booking: Booking = new Booking;
  private subscriptions: Subscription [] = [];
  noOfNight:any;
  noOfDays: number = 0;
  
  
  constructor(private activatedRoute: ActivatedRoute, private bookingService: BookingService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.bookingIdFromUrl = this.activatedRoute.snapshot.paramMap.get("id");
    this.getEachBooking();
  }

  getEachBooking():void {

    const formData = new FormData();
    formData.append("bookingId", this.bookingIdFromUrl);
 
    this.subscriptions.push(
      
      this.bookingService.getBookingById(formData).subscribe(
        (response: Booking) => {
          
          this.booking = response;
          
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          
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
