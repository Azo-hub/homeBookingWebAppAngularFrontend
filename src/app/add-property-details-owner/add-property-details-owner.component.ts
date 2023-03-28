import { HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationType } from '../enum/notification-type.enum';
import { Property } from '../model/property';
import { NotificationService } from '../service/notification.service';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-add-property-details-owner',
  templateUrl: './add-property-details-owner.component.html',
  styleUrls: ['./add-property-details-owner.component.css']
})
export class AddPropertyDetailsOwnerComponent implements OnInit, OnDestroy {

  showLoading: boolean = false;
  showLoadingg: boolean = false; 
  private subscriptions: Subscription [] = [];
  propertyId!: number|undefined;
  profileImage!: File;
  showImageUpload:boolean=false;
  
  
  
  
  constructor(private propertyService: PropertyService, 
    private router: Router, private notificationService: NotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
   /* if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl("/");
      
    }   */
  }

  public onAddNewProperty(property: Property): void {
    this.showLoading = true;
    
    this.subscriptions.push(
      this.propertyService.newProperty(property).subscribe(
        (response: HttpResponse<Property>) => {
          
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Property ${response.body?.name} created successfully.`);
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
    this.showLoadingg = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage1`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.showLoadingg = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoadingg = false;
          }
        )
      
      
      
    
  }
  
  
  
  
  public onFileSelected2(file:File):void {
    this.showLoadingg = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage2`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.showLoadingg = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoadingg = false;
          }
        )
      
      
      
    
  }
  
  
  
  public onFileSelected3(file:File):void {
    this.showLoadingg = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage3`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.showLoadingg = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoadingg = false;
          }
        )
      
      
      
    
  }
  
  
  
  public onFileSelected4(file:File):void {
    this.showLoadingg = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage4`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.showLoadingg = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoadingg = false;
          }
        )
      
      
      
    
  }
  
  
  
  
  public onFileSelected5(file:File):void {
    this.showLoadingg = true;
   this.profileImage = file;
    
        const formData = new FormData();
        formData.append("propertyImage",this.profileImage);
        formData.append("propertyId",String(this.propertyId));
        
        const upload$ = this.http.post(`${this.host}/uploadPropertyImage5`,formData);
        
        upload$.subscribe(
          (response: any) => {
            this.showLoadingg = false;
            this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);
            
            
          },
          (errorResponse: HttpErrorResponse) => {
            
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
            this.showLoadingg = false;
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
