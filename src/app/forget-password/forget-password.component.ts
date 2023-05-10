import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
/*import { NgbModal } from '@ng-bootstrap/ng-bootstrap';*/
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  private titleSubject = new BehaviorSubject<string>('');
  public titleAction$ = this.titleSubject.asObservable();
  private subscriptions: Subscription[] = [];
  public refreshing:boolean = false;
  
  constructor(private userService: UserService, /*private modalService: NgbModal,*/
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  
  
  onResetPassword(emailForm:NgForm): void {
    this.refreshing = true;
    const emailAddress = emailForm.value['email'];
    const formData = new FormData();
    formData.append("email", emailAddress);
   
    this.subscriptions.push(
      this.userService.resetPassword(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.refreshing = false;
        },
        (error:HttpErrorResponse) => {
          this.sendNotification(NotificationType.WARNING, error.error.message);
          this.refreshing = false;
        },
        
        () => emailForm.reset()
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

}
