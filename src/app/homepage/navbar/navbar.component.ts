import { Component, DoCheck, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Role } from 'src/app/enum/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUsername:string= "";


  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService, 
    private authenticationService: AuthenticationService) { }

  

  ngOnInit(): void {
    this.loggedInUsername = this.authenticationService.getUserFromLocalCache().username;
   
  }

  onLogOutNav():void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/');
    this.sendNotification(NotificationType.SUCCESS, 
      `You've been logged out successfully`);
  }


  public get isAdmin(): boolean {
    return this.authenticationService.getUserRole() === Role.ADMIN;
  }
  
  public get isOwner(): boolean {
    return this.authenticationService.getUserRole() === Role.OWNER;
  }

  public get isTraveller(): boolean {
    return this.authenticationService.getUserRole() === Role.TRAVELLER;
  }

  public get isAuthenticated(): boolean {
    return this.authenticationService.isUserAuthenticated();
    
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
