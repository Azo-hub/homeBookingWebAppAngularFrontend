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
import { Role } from '../enum/role.enum';
import { PropertyService } from '../service/property.service';
import { Property } from '../model/property';
import { CustomHttpResponse } from '../model/custom-http-response';

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
  propertiesByOwner: Property[] = [];
  deletePropertyShowLoading:boolean = false;
  users: User[] = [];


  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService, 
    private authenticationService: AuthenticationService, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalCache();
    this.loggedInUserRole = this.loggedInUser.role.substring(5);
    this.loggedInUserPermission = this.loggedInUser.authorities;
    this.getPropertyByOwner();
    this.getAllUsers();
  }
  
  onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/');
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


  getPropertyByOwner():void {
    
    const formData = new FormData();
    formData.append("propertyOwner",this.loggedInUser.username);
    this.subscriptions.push(
      
      this.propertyService.getPropertiesByOwner(formData).subscribe(
        (response: Property[]) => {
          this.propertyService.addPropertiesToLocalCache(response);
          this.propertiesByOwner = response;
          
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          
        }
      )
    );
    
  }


  getAllUsers():void {
    
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          
        }
      )
    );
    
  }


  onSearchProperty(searchInput:string):void {
    
    const searchProperty: Property[] = [];
    for (const eachSearchProperty of this.propertyService.getPropertiesFromLocalCache() ) {
     
      if(eachSearchProperty.name?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 || 
        eachSearchProperty.description?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchProperty.propertyType?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchProperty.propertyAddress?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {
           
          searchProperty.push(eachSearchProperty);
          
         }
    }

    this.propertiesByOwner = searchProperty
    if(searchProperty.length === 0 || !searchInput) {
      this.propertiesByOwner = this.propertyService.getPropertiesFromLocalCache();
    }

  }





  onSearchUser(searchInput:string):void {
    
    const searchUser: User[] = [];
    for (const eachSearchUser of this.userService.getUsersFromLocalCache() ) {
     
      if(eachSearchUser.firstname?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 || 
        eachSearchUser.lastname?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchUser.othername?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchUser.username?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchUser.userId?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchUser.email?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {
           
          searchUser.push(eachSearchUser);
          
         }
    }

    this.users = searchUser
    if(searchUser.length === 0 || !searchInput) {
      this.users = this.userService.getUsersFromLocalCache();
    }

  }








 

  onClickDelete(deletePropertyId:number):void {
    this.deletePropertyShowLoading = true;
    const formData = new FormData();
    formData.append("deletePropertyId",deletePropertyId.toString());
    this.subscriptions.push(
      
      this.propertyService.deleteProperty(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.deletePropertyShowLoading = false;
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getPropertyByOwner();
        },
        (errorResponse: HttpErrorResponse) => {
          this.deletePropertyShowLoading = false;
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    ); 

  }



  public get isAdminOrOwner(): boolean {
    return this.authenticationService.getUserRole() === Role.ADMIN || this.authenticationService.getUserRole() === Role.OWNER;
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
