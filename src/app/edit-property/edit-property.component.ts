import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { Property } from '../model/property';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { PropertyService } from '../service/property.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Review } from '../model/review';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from '../model/custom-http-response';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  pictureShowLoadingEdit: boolean; pictureShowLoading2: boolean; pictureShowLoading3: boolean;
  pictureShowLoading4: boolean; pictureShowLoading5: boolean; pictureShowLoading6: boolean;
  pictureShowLoading7: boolean; pictureShowLoading8: boolean; pictureShowLoading9: boolean;
  pictureShowLoading10: boolean; pictureShowLoading11: boolean; pictureShowLoading12: boolean;
  pictureShowLoading13: boolean; pictureShowLoading14: boolean; pictureShowLoading15: boolean;
  pictureShowLoading16: boolean; pictureShowLoading17: boolean; pictureShowLoading18: boolean;
  pictureShowLoading19: boolean; pictureShowLoading20: boolean; pictureShowLoading21: boolean;
  pictureShowLoading22: boolean; pictureShowLoading23: boolean; pictureShowLoading24: boolean;
  pictureShowLoading25: boolean; pictureShowLoading26: boolean; pictureShowLoading27: boolean;
  pictureShowLoading28: boolean; pictureShowLoading29: boolean; pictureShowLoading30: boolean;


  pictureEditShowLoading: boolean;
  picture2showLoading: boolean;
  picture3showLoading: boolean;
  picture4showLoading: boolean;
  picture5showLoading: boolean;
  picture6showLoading: boolean;
  picture7showLoading: boolean;
  picture8showLoading: boolean;
  picture9showLoading: boolean;
  picture10showLoading: boolean;
  picture11showLoading: boolean;
  picture12showLoading: boolean;
  picture13showLoading: boolean;
  picture14showLoading: boolean;
  picture15showLoading: boolean;
  picture16showLoading: boolean;
  picture17showLoading: boolean;
  picture18showLoading: boolean;
  picture19showLoading: boolean;
  picture20showLoading: boolean;
  picture21showLoading: boolean;
  picture22showLoading: boolean;
  picture23showLoading: boolean;
  picture24showLoading: boolean;
  picture25showLoading: boolean;
  picture26showLoading: boolean;
  picture27showLoading: boolean;
  picture28showLoading: boolean;
  picture29showLoading: boolean;
  picture30showLoading: boolean;

  private subscriptions: Subscription[] = [];
  propertyId!: number | undefined;
  profileImage!: File;
  showImageUpload: boolean = false;
  editPropertyIdFromUrl: string = "";
  property: Property = new Property;
  showEditPropertySection: boolean = false;
  reviews: Review[] = [];
  showLoadingDone: boolean;
  showReview: boolean = false;

  public host = environment.apiUrl;



  constructor(private propertyService: PropertyService, private authenticationService: AuthenticationService,
    private router: Router, private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl("/");
      this.sendNotification(NotificationType.ERROR, "You need to log in to access add new property page!");
    }

    this.editPropertyIdFromUrl = this.activatedRoute.snapshot.paramMap.get("id");
    this.getPropertyForEdit();
    this.getAllReviewsByProperty();
  }

  getPropertyForEdit(): void {

    const formData = new FormData();
    formData.append("propertyId", this.editPropertyIdFromUrl);
    this.subscriptions.push(

      this.propertyService.getPropertyById(formData).subscribe(
        (response: Property) => {
          //this.uService.addUsersToLocalCache(response);
          this.property = response;

        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );
  }




  public onEditProperty(property: Property): void {
    this.showLoading = true;

    this.subscriptions.push(

      this.propertyService.editProperty(property).subscribe(
        (response: HttpResponse<Property>) => {

          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Property ${response.body?.name} edited successfully. Proceed to add property Images`);
          this.propertyId = response.body?.id;
          this.showEditPropertySection = true;
          this.showImageUpload = true;

        },
        (errorResponse: HttpErrorResponse) => {

          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }


  imageUploadDone(): void {
    this.showImageUpload = false;
    this.showReview = true;

  }


  onPushReview(reviewForm: NgForm): void {

    this.showLoading = true;

    const formData = new FormData();

    formData.append("reviewContent", reviewForm.value.reviewContent);
    formData.append("reviewAuthor", reviewForm.value.reviewAuthor);
    formData.append("reviewLocation", reviewForm.value.reviewLocation);
    formData.append("propertyId", this.propertyId.toString());
    console.log(reviewForm.value.reviewContent);
    console.log(reviewForm.value.reviewAuthor);
    console.log(reviewForm.value.reviewLocation);

    this.subscriptions.push(
      this.propertyService.addReview(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.showLoading = false;
          this.getAllReviewsByProperty();
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

  getAllReviewsByProperty(): void {
    const formData = new FormData();
    formData.append("propertyId", this.editPropertyIdFromUrl);
    this.subscriptions.push(
      this.propertyService.getReviewsByProperty(formData).subscribe(
        (response: Review[]) => {
          this.reviews = response;
        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );

  }





  public onEditFileSelected(file: File, i: number): void {
    this.pictureShowLoadingEdit = true;
    this.pictureEditShowLoading = true;

    const formData = new FormData();
    formData.append("propertyImage", file);
    formData.append("propertyId", String(this.propertyId));
    formData.append("fileIndex", String(i));

    const upload$ = this.http.post(`${this.host}/editPropertyImage`, formData);

    upload$.subscribe(
      (response: any) => {
        this.pictureShowLoadingEdit = false
        this.pictureEditShowLoading = false;
        this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);


      },
      (errorResponse: HttpErrorResponse) => {

        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.pictureShowLoadingEdit = false;
        this.pictureEditShowLoading = false;
      }
    )


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







}
