import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Review } from '../model/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  propertyId!: number | undefined;
  showAddPropertySection: boolean = false;
  reviews: Review[] = [];
  showLoadingDone: boolean;
  showReview: boolean = false;


  constructor() { }
  

  ngOnInit(): void {
  }

  onPushReview(reviewForm: NgForm): void {
    this.showLoading = true;

    const formData = new FormData();

    formData.append("reviewContent", reviewForm.value.reviewContent);
    formData.append("reviewAuthor", reviewForm.value.reviewAuthor);
    formData.append("reviewLocation", reviewForm.value.reviewLocation);
    formData.append("propertyId", this.propertyId.toString());
  //  console.log(reviewForm.value.reviewContent);
  //  console.log(reviewForm.value.reviewAuthor);
  //  console.log(reviewForm.value.reviewLocation);

    this.subscriptions.push(
      this.propertyService.addReview(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.showLoading = false;
          this.getAllReviewsByProperty(this.propertyId);
          this.showLoadingDone = true;
          /*this.router.navigateByUrl(`/propertydetails/${this.propertyId}`);*/
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



  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
