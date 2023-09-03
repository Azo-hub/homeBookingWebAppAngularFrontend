import { HttpResponse, HttpErrorResponse, HttpClient, HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
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
  fileStatus = { status: '', requestType: '', percent: 0 };



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






  public onFileSelected(files: File[]): void {

    this.pictureShowLoading = true;
    this.pictureshowLoading = true;

    const formData = new FormData();
    for (const file of files) {
      formData.append('propertyImages', file, file.name);
      formData.append("propertyId", String(this.propertyId));
    }

    this.subscriptions.push(
      this.propertyService.uploadPropertyImages(formData).subscribe(
        (response: CustomHttpResponse) => {

        /*  this.reportProgress(event); */
          this.pictureShowLoading = false
          this.pictureshowLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Images uploaded successfully.`);

        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.pictureShowLoading = false;
          this.pictureshowLoading = false;
        }
      )
    );



  }




/*  private reportProgress(httpEvent: HttpEvent<any | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading...');
        break;

      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading...');
        break;

      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;

      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';

        }
        break;

      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);

  }

*/


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
