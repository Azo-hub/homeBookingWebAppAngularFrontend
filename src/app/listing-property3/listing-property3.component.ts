import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-listing-property3',
  templateUrl: './listing-property3.component.html',
  styleUrls: ['./listing-property3.component.css']
})
export class ListingProperty3Component implements OnInit, OnDestroy {

  owner: string = "owner";
  showLoading: boolean = false; 
  private subscriptions: Subscription [] = [];
  
  constructor(private authenticationService: AuthenticationService, 
    private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    
  }

  public onOwnerSignUp(user: User): void {
    this.showLoading = true;
    
    this.subscriptions.push(
      this.authenticationService.newUser(user).subscribe(
        (response: HttpResponse<User>) => {
          
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `New Account created for ${response.body?.username} successfully. 
          Please check your email for password to log in.`);
          this.router.navigateByUrl("/addNewProperty");
          
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
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
