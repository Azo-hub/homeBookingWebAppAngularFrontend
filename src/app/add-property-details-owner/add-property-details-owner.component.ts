import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { Property } from '../model/property';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-add-property-details-owner',
  templateUrl: './add-property-details-owner.component.html',
  styleUrls: ['./add-property-details-owner.component.css']
})
export class AddPropertyDetailsOwnerComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  pictureShowLoading1: boolean;
  pictureShowLoading2: boolean;
  pictureShowLoading3: boolean;
  pictureShowLoading4: boolean;
  pictureShowLoading5: boolean;
  picture1showLoading: boolean; 
  picture2showLoading: boolean; 
  picture3showLoading: boolean; 
  picture4showLoading: boolean; 
  picture5showLoading: boolean; 
  private subscriptions: Subscription [] = [];
  propertyId!: number|undefined;
  profileImage!: File;
  showImageUpload:boolean=false;
  
  
  
  
  constructor(private propertyService: PropertyService, private authenticationService : AuthenticationService,
    private router: Router, private notificationService: NotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
   if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl("/");
      this.sendNotification(NotificationType.ERROR, "You need to log in to access add new property page!");
    }   
  }

  public onAddNewProperty(property: Property): void {
    this.showLoading = true;
    
    this.subscriptions.push(
      this.propertyService.newProperty(property).subscribe(
        (response: HttpResponse<Property>) => {
          
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Property ${response.body?.name} created successfully. Proceed to add property Images`);
          this.propertyId=response.body?.id;
          this.showImageUpload = true;
          
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  
  public host = environment.apiUrl;
  
  public onFileSelected1(file:File):void {
    this.pictureShowLoading1 = true;
    this.picture1showLoading = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage1`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.pictureShowLoading1 = false
            this.picture1showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.pictureShowLoading1 = false;
            this.picture1showLoading = false;
          }
        )
      
      
      
    
  }
  
  
  
  
  public onFileSelected2(file:File):void {
    this.pictureShowLoading2 = true;
    this.picture2showLoading = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage2`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.pictureShowLoading2 = false;
            this.picture2showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.pictureShowLoading2 = false;
            this.picture2showLoading = false;
          }
        )
      
      
      
    
  }
  
  
  
  public onFileSelected3(file:File):void {
    this.pictureShowLoading3 = true;
    this.picture3showLoading = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage3`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.pictureShowLoading3 = false;
            this.picture3showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.pictureShowLoading3 = false;
            this.picture3showLoading = false;
          }
        )
      
      
      
    
  }
  
  
  
  public onFileSelected4(file:File):void {
    this.pictureShowLoading4 = true;
    this.picture4showLoading = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage4`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.pictureShowLoading4 = false;
            this.picture4showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.pictureShowLoading4 = false;
            this.picture4showLoading = false;
          }
        )
      
      
      
    
  }
  
  
  
  
  public onFileSelected5(file:File):void {
    this.pictureShowLoading5 = true;
    this.picture5showLoading = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage5`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.pictureShowLoading5 = false;
            this.picture5showLoading = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.pictureShowLoading5 = false;
            this.picture5showLoading = false;
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


}
