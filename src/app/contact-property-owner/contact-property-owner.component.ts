import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NgForm } from '@angular/forms';
import { CustomHttpResponse } from '../model/custom-http-response';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact-property-owner',
  templateUrl: './contact-property-owner.component.html',
  styleUrls: ['./contact-property-owner.component.css']
})
export class ContactPropertyOwnerComponent implements OnInit {

  contactPropertyOwnerRefreshing: boolean = false;
  user: User = new User;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();
  }


  onContactPropertyOwner(contactPropertyOwnerForm: NgForm): void {
    this.contactPropertyOwnerRefreshing = true;
    const formData = new FormData();
    formData.append("firstname", contactPropertyOwnerForm.value.firstname);
    formData.append("lastname", contactPropertyOwnerForm.value.lastname);
    formData.append("email", contactPropertyOwnerForm.value.email);
    formData.append("phonenumber", contactPropertyOwnerForm.value.phonenumber);
    formData.append("subject", contactPropertyOwnerForm.value.subject);
    formData.append("problem", contactPropertyOwnerForm.value.problemInView);

    this.subscriptions.push(
      this.userService.contactSupport(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.contactPropertyOwnerRefreshing = false;
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.contactPropertyOwnerRefreshing = false;
        },

        () => contactPropertyOwnerForm.reset()
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
