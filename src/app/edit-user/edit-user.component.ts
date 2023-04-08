import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Property } from '../model/property';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { CustomHttpResponse } from '../model/custom-http-response';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription [] = [];
  verifyShowLoading: boolean = false;
  editUserUsernameFromUrl: string = "";
  user:User = new User;
  

  constructor(private userService: UserService, private authenticationService : AuthenticationService,
    private router: Router, private notificationService: NotificationService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editUserUsernameFromUrl = this.activatedRoute.snapshot.paramMap.get("username");
    this.getUserForEdit();
  }


  getUserForEdit():void {
    
    const formData = new FormData();
    formData.append("username",this.editUserUsernameFromUrl);
    this.subscriptions.push(
      
      this.userService.getUserByUsername(formData).subscribe(
        (response: User) => {
          //this.uService.addUsersToLocalCache(response);
          this.user = response;
          
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          
        }
      )
    );    
  }



  onVerifyAccount(verify: boolean):void {
    this.verifyShowLoading = true;
    const formData = new FormData();
    formData.append("verify", verify.toString());
    formData.append("username", this.user.username);

    this.subscriptions.push(
      this.userService.verify(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.verifyShowLoading = false;
        },
        (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.verifyShowLoading = false;
        },
      )
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
