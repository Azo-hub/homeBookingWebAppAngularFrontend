import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { Property } from '../model/property';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { PropertyService } from '../service/property.service';
import { NgForm } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Review } from '../model/review';



@Component({
  selector: 'app-add-property-details-owner',
  templateUrl: './add-property-details-owner.component.html',
  styleUrls: ['./add-property-details-owner.component.css']
})


export class AddPropertyDetailsOwnerComponent implements OnInit, OnDestroy, AfterViewInit {

  showLoading: boolean = false;
  pictureShowLoading: boolean;
  pictureshowLoading: boolean;

  private subscriptions: Subscription[] = [];
  propertyId!: number | undefined;
  profileImage!: File;
  showImageUpload: boolean = false;
  showAddPropertySection: boolean = false;

  showLoadingDone: boolean;
  public host = environment.apiUrl;



  states = [
    { value: "Abia", label: "Abia" }, { value: "Adamawa", label: "Adamawa" },
    { value: "Akwa Ibom", label: "Akwa Ibom" }, { value: "Anambra", label: "Anambra" },
    { value: "Bauchi", label: "Bauchi" }, { value: "Bayelsa", label: "Bayelsa" },
    { value: "Benue", label: "Benue" }, { value: "Borno", label: "Borno" },
    { value: "Cross River", label: "Cross River" }, { value: "Delta", label: "Delta" },
    { value: "Ebonyi", label: "Ebonyi" }, { value: "Edo", label: "Edo" },
    { value: "Ekiti", label: "Ekiti" }, { value: "Enugu", label: "Enugu" },
    { value: "Gombe", label: "Gombe" }, { value: "Imo", label: "Imo" },
    { value: "Jigawa", label: "Jigawa" }, { value: "Kaduna", label: "Kaduna" },
    { value: "Kano", label: "Kano" }, { value: "Katsina", label: "Katsina" },
    { value: "Kebbi", label: "Kebbi" }, { value: "Kogi", label: "Kogi" },
    { value: "Kwara", label: "Kwara" }, { value: "Lagos", label: "Lagos" },
    { value: "Nasarawa", label: "Nasarawa" }, { value: "Niger", label: "Niger" },
    { value: "Ogun", label: "Ogun" }, { value: "Ondo", label: "Ondo" },
    { value: "Osun", label: "Osun" }, { value: "Oyo", label: "Oyo" },
    { value: "Plateau", label: "Plateau" }, { value: "Rivers", label: "Rivers" },
    { value: "Sokoto", label: "Sokoto" }, { value: "Taraba", label: "Taraba" },
    { value: "Yobe", label: "Yobe" }, { value: "Zamfara", label: "Zamfara" },
    { value: "F.C.T.", label: "F.C.T." }

  ]



  constructor(private propertyService: PropertyService, private authenticationService: AuthenticationService,
    private router: Router, private notificationService: NotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl("/");
      this.sendNotification(NotificationType.ERROR, "You need to log in to access add new property page!");
    }

  }



  ngAfterViewInit(): void {

  }





  public onAddNewProperty(property: Property): void {

    this.showLoading = true;

    this.subscriptions.push(
      this.propertyService.newProperty(property).subscribe(
        (response: HttpResponse<Property>) => {

          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Property ${response.body?.name} created successfully. Proceed to add property Images`);
          this.propertyId = response.body?.id;
          this.showAddPropertySection = true;
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
    this.router.navigateByUrl(`/propertydetails/${this.propertyId}`);
  }






  public onFileSelected(file: File): void {
    this.pictureShowLoading = true;
    this.pictureshowLoading = true;
    this.profileImage = file;

    const formData = new FormData();
    formData.append("propertyImage", this.profileImage);
    formData.append("propertyId", String(this.propertyId));

    const upload$ = this.http.post(`${this.host}/uploadPropertyImages`, formData);

    upload$.subscribe(
      (response: any) => {
        this.pictureShowLoading = false
        this.pictureshowLoading = false;
        this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);


      },
      (errorResponse: HttpErrorResponse) => {

        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.pictureShowLoading = false;
        this.pictureshowLoading = false;
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
