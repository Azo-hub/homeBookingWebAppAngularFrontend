import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public loggedInUser : User = new User();
  userProfileShowLoading:boolean = false;
  loggedInUserRole: string = "";
  loggedInUserPermission: [] = [];

  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalCache();
    this.loggedInUserRole = this.loggedInUser.role.substring(5);
    this.loggedInUserPermission = this.loggedInUser.authorities;
  }
  
  onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
    this.sendNotification(NotificationType.SUCCESS, 
      `You've been logged out successfully`);
  }
  
  onUpdateCurrentUser(userProfileForm:NgForm):void {
    this.userProfileShowLoading = true;
    const formData = 
          this.userService.updateUserProfileBySelfFormData(userProfileForm.value['username'], userProfileForm.value,
          userProfileForm.value['currentPassword'], userProfileForm.value['newPassword'], userProfileForm.value['confirmPassword']);
    
         
    this.subscriptions.push(
      this.userService.updateUserBySelf(formData).subscribe(
    
        (response: User) => {
          this.userProfileShowLoading = false;
          this.authenticationService.addUserToLocalCache(response);
          this.loggedInUser = this.authenticationService.getUserFromLocalCache();
          this.sendNotification(NotificationType.SUCCESS, 
            `${response.username} successfully updated`);
        },
    
        (errorResponse: HttpErrorResponse) => {
          this.userProfileShowLoading = false;
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
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
