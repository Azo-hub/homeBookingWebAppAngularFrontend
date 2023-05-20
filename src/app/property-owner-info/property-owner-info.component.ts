import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { CustomHttpResponse } from '../model/custom-http-response';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { Property } from '../model/property';
import { PropertyService } from '../service/property.service';

@Component({
  selector: 'app-property-owner-info',
  templateUrl: './property-owner-info.component.html',
  styleUrls: ['./property-owner-info.component.css']
})
export class PropertyOwnerInfoComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  propertiesByOwner: Property[] = [];
  propertyOwnerInfoUsername: string = "";
  user: User = new User;


  constructor(private userService: UserService, private propertyService: PropertyService,
    private router: Router, private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyOwnerInfoUsername = this.activatedRoute.snapshot.paramMap.get("username");
    this.getPropertyOwnerInfo();
    this.getPropertyByOwner();
  }


  getPropertyOwnerInfo(): void {

    const formData = new FormData();
    formData.append("username", this.propertyOwnerInfoUsername);
    this.subscriptions.push(

      this.userService.getUserByUsername(formData).subscribe(
        (response: User) => {
          this.user = response;

        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );
  }



  getPropertyByOwner(): void {

    const formData = new FormData();
    formData.append("propertyOwner", this.propertyOwnerInfoUsername);
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


  onSearchProperty(searchInput: string): void {

    const searchProperty: Property[] = [];
    for (const eachSearchProperty of this.propertyService.getPropertiesFromLocalCache()) {

      if (eachSearchProperty.name?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchProperty.propertyType?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1 ||
        eachSearchProperty.propertyAddress1?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) {

        searchProperty.push(eachSearchProperty);

      }
    }

    this.propertiesByOwner = searchProperty
    if (searchProperty.length === 0 || !searchInput) {
      this.propertiesByOwner = this.propertyService.getPropertiesFromLocalCache();
    }

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
