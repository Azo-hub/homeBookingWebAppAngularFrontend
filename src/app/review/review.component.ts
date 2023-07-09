import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from '../model/review';
import { PropertyService } from '../service/property.service';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type.enum';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from '../model/custom-http-response';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  @Input("id")
  id: string;

  propertyId!: number | undefined;

  showAddPropertySection: boolean = false;
  reviews: Review[] = [];
  showLoadingDone: boolean;
  showReview: boolean = false;


  constructor(private propertyService: PropertyService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.getAllReviewsByProperty(Number(this.id));
  }



  getAllReviewsByProperty(id: number): void {
    this.propertyId = id;

    const formData = new FormData();
    formData.append("propertyId", JSON.stringify(this.propertyId));

    this.subscriptions.push(
      this.propertyService.getReviewsByProperty(formData).subscribe(
        (response: Review[]) => {
          this.reviews = response;
        },

        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
        }



      )
    );



  }

  onPushReview(reviewForm: NgForm): void {
    this.showLoading = true;

    const formData = new FormData();

    formData.append("reviewContent", reviewForm.value.reviewContent);
    formData.append("reviewAuthor", reviewForm.value.reviewAuthor);
    formData.append("reviewLocation", reviewForm.value.reviewLocation);
    formData.append("propertyId", this.propertyId.toString());

    this.subscriptions.push(
      this.propertyService.addReview(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.showLoading = false;
          this.getAllReviewsByProperty(this.propertyId);
          this.showLoadingDone = true;
          
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.showLoading = false;
        }



      )
    );

    reviewForm.reset();

  }


  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType,
        "An error occurred. Please Try Again Later");
    }
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
