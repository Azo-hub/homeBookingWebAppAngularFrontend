import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Role } from '../enum/role.enum';
import { PropertyService } from '../service/property.service';
import { Property } from '../model/property';
import { CustomHttpResponse } from '../model/custom-http-response';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking';
import { BookingService } from '../service/booking.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public host = environment.apiUrl;
  showDates: boolean = true;
  addDatesBtn: boolean = true;
  private subscriptions: Subscription[] = [];
  public loggedInUser: User = new User();
  userProfileShowLoading: boolean = false;
  loggedInUserRole: string = "";
  loggedInUserPermission: [] = [];
  propertiesByOwner: Property[] = [];
  deletePropertyShowLoading: boolean = false;
  addDateShowLoading: boolean = false;
  users: User[] = [];
  imageShowLoading1: boolean;
  image1showLoading: boolean;
  identityImage!: File;
  options = [
    { value: "IDCard", label: "ID Card" },
    { value: "SSN", label: "SSN" }
  ]

  userGender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" }
  ]

  identityType: string = "";
  imageShowLoading2: boolean;
  image2showLoading: boolean;
  profileImage: File;
  bookings: Booking[] = [];
  Allbooking: Booking[] = [];
  Allproperties: Property[] = [];


  constructor(private router: Router, private userService: UserService, private notificationService: NotificationService,
    private authenticationService: AuthenticationService, private propertyService: PropertyService,
    private http: HttpClient, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticationService.getUserFromLocalCache();
    this.loggedInUserRole = this.loggedInUser.role.substring(5);
    this.loggedInUserPermission = this.loggedInUser.authorities;
    this.getPropertyByOwner();
    this.getAllUsers();
    this.options;
    this.userGender;
    this.getAllBookingByUser();
    this.getAllBooking();
    this.getAllProperty();
  }

  onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/');
    this.sendNotification(NotificationType.SUCCESS,
      `You've been logged out successfully`);
  }

  onUpdateCurrentUser(userProfileForm: NgForm): void {
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


  getPropertyByOwner(): void {

    const formData = new FormData();
    formData.append("propertyOwner", this.loggedInUser.username);
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

  getAllProperty(): void {
    this.subscriptions.push(

      this.propertyService.getAllProperties().subscribe(
        (response: Property[]) => {
          this.propertyService.addPropertiesToLocalCacheAdmin(response);
          this.Allproperties = response;

        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );

  }


  getAllUsers(): void {

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


  getAllBookingByUser(): void {

    this.subscriptions.push(
      this.bookingService.getAllBookingByUser().subscribe(
        (response: Booking[]) => {
          this.bookings = response;
        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );

  }

  getAllBooking(): void {

    this.subscriptions.push(
      this.bookingService.getAllBooking().subscribe(
        (response: Booking[]) => {
          this.Allbooking = response;
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


  onSearchBooking(searchInputBooking: string): void {

    const searchBooking: Booking[] = [];
    for (const eachSearchBooking of this.bookingService.getBookingsFromLocalCache()) {

      if (eachSearchBooking.property.name?.toLowerCase().indexOf(searchInputBooking.toLowerCase()) !== -1 ||
        eachSearchBooking.bookingFirstName?.toLowerCase().indexOf(searchInputBooking.toLowerCase()) !== -1 ||
        eachSearchBooking.bookingEmailAddress?.toLowerCase().indexOf(searchInputBooking.toLowerCase()) !== -1 ||
        eachSearchBooking.bookingCheckInDate?.toString().toLowerCase().indexOf(searchInputBooking.toLowerCase()) !== -1 ||
        eachSearchBooking.bookingEmailAddress?.toString().toLowerCase().indexOf(searchInputBooking.toLowerCase()) !== -1 ||
        eachSearchBooking.id?.toString().indexOf(searchInputBooking.toLowerCase()) !== -1) {

        searchBooking.push(eachSearchBooking);

      }
    }

    this.bookings = searchBooking
    if (searchBooking.length === 0 || !searchInputBooking) {
      this.bookings = this.bookingService.getBookingsFromLocalCache();
    }

  }


  onSearchAllBooking(searchInputAllBooking: string): void {
    const formData = new FormData();
    formData.append("searchInput", searchInputAllBooking);
    this.subscriptions.push(
      this.bookingService.searchAllBooking(formData).subscribe(
        (response: Booking[]) => {
          this.Allbooking = response;
        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );
  }

  onSearchPropertyDate(searchInputDate: string): void {
    const searchPropertyDate: Property[] = [];
    for (const eachSearchPropertyDate of this.propertyService.getPropertiesFromLocalCacheAdmin()) {

      if (eachSearchPropertyDate.name?.toLowerCase().indexOf(searchInputDate.toLowerCase()) !== -1 ||

        eachSearchPropertyDate.propertyType?.toLowerCase().indexOf(searchInputDate.toLowerCase()) !== -1 ||
        eachSearchPropertyDate.propertyAddress1?.toLowerCase().indexOf(searchInputDate.toLowerCase()) !== -1) {

        searchPropertyDate.push(eachSearchPropertyDate);

      }
    }

    this.Allproperties = searchPropertyDate
    if (searchPropertyDate.length === 0 || !searchInputDate) {
      this.Allproperties = this.propertyService.getPropertiesFromLocalCacheAdmin();
    }

  }





  onSearchUser(searchUserInput: string): void {

    const formData = new FormData();
    formData.append("searchInput", searchUserInput);
    this.subscriptions.push(
      this.userService.searchUsers(formData).subscribe(
        (response: User[]) => {
          this.users = response;
        },

        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);

        }
      )
    );


    if (!searchUserInput) {
      this.users = this.userService.getUsersFromLocalCache();
    }

  }










  onClickDelete(deletePropertyId: number): void {
    this.deletePropertyShowLoading = true;
    const formData = new FormData();
    formData.append("deletePropertyId", deletePropertyId.toString());
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



  changePhotoClick(): void {
    document.getElementById("imageFileType")?.click();
  }


  displayDate(): void {
    /* document.getElementById("showDates")?.classList.toggle('display_checkin_checkout_dates');
     document.getElementById("addDatesBtn")?.classList.toggle('display_checkin_checkout_dates'); */
    this.showDates = false;
    this.addDatesBtn = false;
  }

  onAddDate(checkinDateAdmin: Date, checkoutDateAdmin: Date, propertyId: number): void {
    this.addDateShowLoading = true;
    const formData = new FormData();
    formData.append("checkinDateAdmin", checkinDateAdmin.toString());
    formData.append("checkoutDateAdmin", checkoutDateAdmin.toString());
    formData.append("propertyId", propertyId.toString());

    this.subscriptions.push(

      this.propertyService.addCheckInCheckOutDates(formData).subscribe(
        (response: CustomHttpResponse) => {
          this.addDateShowLoading = false;
          this.sendNotification(NotificationType.SUCCESS, response.message);

        },
        (errorResponse: HttpErrorResponse) => {
          this.addDateShowLoading = false;
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        }
      )
    );

  }

  public onFileSelected1(file: File): void {


    if (this.identityType.length == 0) {

      this.sendNotification(NotificationType.ERROR, `Please Select your Identification Type`);

    } else {

      this.imageShowLoading1 = true;
      this.image1showLoading = true;
      this.identityImage = file;

      const formData = new FormData();
      formData.append("identityImage", this.identityImage);
      formData.append("identityType", this.identityType)

      const upload$ = this.http.post(`${this.host}/uploadIdentityImage`, formData);

      upload$.subscribe(
        (response: any) => {
          this.imageShowLoading1 = false
          this.image1showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `Image uploaded successfully.`);


        },
        (errorResponse: HttpErrorResponse) => {

          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.imageShowLoading1 = false;
          this.image1showLoading = false;
        }
      )
    }


  }



  onFileSelected2(file: File): void {
    this.imageShowLoading2 = true;
    this.image2showLoading = true;
    this.profileImage = file;

    const formData = new FormData();
    formData.append("profileImage", this.profileImage);


    const upload$ = this.http.post(`${this.host}/uploadProfileImage`, formData);

    upload$.subscribe(
      (response: any) => {
        this.imageShowLoading2 = false
        this.image2showLoading = false;
        this.sendNotification(NotificationType.SUCCESS, `Profile Image updated successfully.`);


      },
      (errorResponse: HttpErrorResponse) => {

        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.imageShowLoading2 = false;
        this.image2showLoading = false;
      }
    )
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
