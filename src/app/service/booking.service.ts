import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }
  
  public newBooking(formData: FormData) : Observable<Booking> {
    return this.http.post<Booking>(`${this.host}/newBooking`, formData);
  } 

  
  public createBookingFormData(bookingFirstName:string,
    bookingLastName:string, bookingEmail:string, bookingHomePhoneNumber:string,
    bookingPhoneNumber:string, bookingCountry:string, bookingState:string, bookingStreet:string, 
    bookingCity:string, bookingZipCode:string, checkInDate:Date, checkOutDate:Date,
    bookingNoOfDays:string, bookingPropertyId:string):FormData {
    
    const formData = new FormData();
    formData.append("bookingFirstName", bookingFirstName);
    formData.append("bookingLastName", bookingLastName);
    
    formData.append("bookingEmailAddress", bookingEmail);
    formData.append("bookingPhoneNumber", bookingPhoneNumber);
    formData.append("bookingHomePhoneNumber", bookingHomePhoneNumber);
    formData.append("bookingCountry", bookingCountry);
    formData.append("bookingStreet", bookingStreet);
    formData.append("bookingCity", bookingCity);
    formData.append("bookingState", bookingState);
    formData.append("bookingZipCode", bookingZipCode);
    formData.append("checkInDate", checkInDate.toString());
    formData.append("checkOutDate", checkOutDate.toString());
    formData.append("bookingNoOfDays", bookingNoOfDays);
    formData.append("bookingPropertyId", bookingPropertyId);
    
  return formData;
  
  }

}
