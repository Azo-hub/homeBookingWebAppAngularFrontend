import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../service/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../enum/notification-type.enum';
import { CustomHttpResponse } from '../model/custom-http-response';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  supportRefreshing: boolean = false;
  user: User = new User;
  private subscriptions: Subscription [] = [];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }


  onSupport(supportForm : NgForm): void {
    this.supportRefreshing = true;
    const formData = new FormData();
    formData.append("firstname",  supportForm.value.firstname);
    formData.append("lastname", supportForm.value.lastname);
    formData.append("email", supportForm.value.email);
    formData.append("phonenumber", supportForm.value.phonenumber);
    formData.append("subject", supportForm.value.subject);
    formData.append("problem", supportForm.value.problemInView);

    this.subscriptions.push(
      this.userService.contactSupport(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.supportRefreshing = false;
        },
        (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.supportRefreshing = false;
        },
        
        () => supportForm.reset()
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

}
