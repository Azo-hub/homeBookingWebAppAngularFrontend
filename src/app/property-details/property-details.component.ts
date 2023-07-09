import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { CheckInAndOutDate } from '../model/checkInAndOutDate';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Property } from '../model/property';
import { NotificationService } from '../service/notification.service';
import { PropertyService } from '../service/property.service';
import { DatePipe } from '@angular/common';
import { Review } from '../model/review';

import { AuthenticationService } from '../service/authentication.service';




@Component({
  selector: 'app-property-details',

  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {

  propertyId: string | null = "";
  private subscriptions: Subscription[] = [];
  property: Property = new Property;
  showLoading: boolean = false;
  checkInDate: any;
  checkOutDate: any;
  noOfGuest: number = 0;
  noOfChildren: number = 0;
  pets: string = "";
  showPropertyAvailabilityTable: boolean = false;
  showPropertyPricesTable: boolean = false;
  noOfNight: number = 0;
  noOfDays: number = 0;
  showBookProceedButton: boolean = false;
  showBookNowButton: boolean = false;
  reviews: Review[] = [];
  currentDate: Date = new Date();


  constructor(private propertyService: PropertyService,/* private authenticationService: AuthenticationService,*/
    private router: Router, private activatedRoute: ActivatedRoute, private notificationService: NotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.propertyId = this.activatedRoute.snapshot.paramMap.get("id");

    this.getEachProperty();
    
  }

  getEachProperty(): void {

    const formData = new FormData();
    formData.append("propertyId", this.propertyId);
    this.subscriptions.push(

      this.propertyService.getPropertyById(formData).subscribe(
        (response: Property) => {
          //this.uService.addUsersToLocalCache(response);
          this.property = response;

          console.log(this.property);

        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );

  }


  onCheckPropertyAvailabilityButtonEvent(): void {


    this.showPropertyAvailabilityTable = true;
    this.showBookNowButton = true;
  }



  onCheckPropertyAvailability(): void {
    this.showLoading = true;
    const formData = new FormData();
    formData.append("checkInDate", this.checkInDate);
    formData.append("checkOutDate", this.checkOutDate);
    formData.append("propertyId", this.property.id.toString());
    // console.log(checkInAndOutDate.checkInDate.value.toString());
    //console.log(checkInAndOutDate.checkOutDate.toString());
    // console.log(checkPropertAvailabilityForm.value.propertyId.toString());
    this.subscriptions.push(
      this.propertyService.checkPropertyAvailability(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.showLoading = false;
          const d1 = new Date(this.checkOutDate);
          const d2 = new Date(this.checkInDate);
          //this.noOfNight = +this.checkOutDate - +this.checkInDate;
          this.noOfNight = d1.getTime() - d2.getTime();
          this.noOfDays = Math.ceil(this.noOfNight / (1000 * 3600 * 24));
          this.showPropertyPricesTable = true;
          this.showBookProceedButton = true;

        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;

        }


      )
    );
  }


  onClickContactPropertyOwner() {
    this.router.navigateByUrl(`/contactPropertyOwner/${this.property.propertyOwner.username}/${this.property.name}`);

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
