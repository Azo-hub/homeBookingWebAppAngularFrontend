import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { Role } from '../enum/role.enum';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, 
    private router: Router, private notificationService: NotificationService) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean  {
      
      if(this.authenticationService.getUserRole() === Role.ADMIN) {
        return true;
      }
      this.router.navigate(['/']);
      this.notificationService.notify(NotificationType.ERROR, 
        'Access Denied! You need to be an Admin to proceed');
      return false;
    

  }
  
}
