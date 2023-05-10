import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationOwnerGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, 
    private router: Router, private notificationService: NotificationService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
    
        if(this.authenticationService.isUserLoggedIn()) {
          return true;
        }
        this.router.navigate(['/ownerLogin']);
        this.notificationService.notify(NotificationType.ERROR, 
          'You need to log in to access this page');
        return false;
      
    
  }
  
}
