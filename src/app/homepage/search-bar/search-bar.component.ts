import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { CustomHttpResponse } from 'src/app/model/custom-http-response';
import { NotificationService } from 'src/app/service/notification.service';
import { PropertyService } from 'src/app/service/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/service/authentication.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  
  searchBarCheckInDate : Date = new Date();
  searchBarCheckOutDate : Date = new Date();
  searchBarNoOfGuest:string = ""; 
  searchBarShowLoading : boolean = false;
  private subscriptions: Subscription[] = [];
  
  
  constructor(private propertyService:PropertyService, private authenticationService:AuthenticationService,
     private notificationService: NotificationService) { }

  ngOnInit(): void {

  }


  onCheckDateAvailability():void {
    if(!this.authenticationService.isUserLoggedIn()) {
      this.sendNotification(NotificationType.ERROR, "You need to login to continue");;
    } else {
      
    
    this.searchBarShowLoading = true;

    const formData = new FormData();
    formData.append("checkInDate" ,this.searchBarCheckInDate.toString());
    formData.append("checkOutDate" ,this.searchBarCheckOutDate.toString());
   // formData.append("propertyId" , this.property.id.toString());
   
    this.subscriptions.push(
      this.propertyService.checkDateAvailability(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.searchBarShowLoading = false;
         
        },
        (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
          this.searchBarShowLoading = false;
        }
        
       
      )
    );

    }
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
