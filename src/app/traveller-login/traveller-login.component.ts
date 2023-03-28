import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-traveller-login',
  templateUrl: './traveller-login.component.html',
  styleUrls: ['./traveller-login.component.css']
})
export class TravellerLoginComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  private subscriptions: Subscription [] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
  
  public onLogin(user: User): void {
    this.showLoading = true;
    
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token || "");
          this.authenticationService.addUserToLocalCache(response.body || null);
          
          this.showLoading = false;
          this.router.navigateByUrl("/");
        },
        (errorResponse: HttpErrorResponse) => {
          
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }
  
  private sendErrorNotification(notificationType: NotificationType, message: string) {
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
