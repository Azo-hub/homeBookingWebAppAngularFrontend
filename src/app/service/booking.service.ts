import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../model/booking';
import { PaymentMethod } from '../model/payment-method';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public newBooking(formData: FormData): Observable<Booking> {
    return this.http.post<Booking>(`${this.host}/newBooking`, formData);
  }

  getBookingById(formData: FormData): Observable<Booking> {
    return this.http.post<Booking>(`${this.host}/getBookingById`, formData);
  }

  getAllBookingByUser(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.host}/allBookingByUser`);
  }

  getAllBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.host}/allBooking`);
  }

  searchAllBooking(formData: FormData): Observable<Booking[]> {
    return this.http.post<Booking[]>(`${this.host}/searchAllBooking`, formData);
  }

  addPaymentCard(formData: FormData): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(`${this.host}/newPaymentCard`, formData);
  }

  addBillingAddress(formData: FormData): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(`${this.host}/newBillingAddress`, formData);
  }

  getAllPaymentMethod(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.host}/getAllPaymentMethod`);
  }

  public setDefaultPaymentMethod(formData: FormData): Observable<PaymentMethod[]> {
    return this.http.post<PaymentMethod[]>(`${this.host}/setDefaultPaymentMethod`, formData);
  }

  public createBookingFormData(bookingFirstName: string,
    bookingLastName: string, bookingEmail: string, bookingHomePhoneNumber: string,
    bookingPhoneNumber: string, bookingCountry: string, bookingState: string, bookingStreet: string,
    bookingCity: string, bookingZipCode: string, checkInDate: Date, checkOutDate: Date,
    bookingNoOfDays: string, bookingPropertyId: string, noOfGuest: string, noOfChildren: string,
    pets: string, bookingPaymentMethod: string): FormData {

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
    formData.append("noOfGuest", noOfGuest);
    formData.append("noOfChildren", noOfChildren);
    formData.append("pets", pets);
    formData.append("bookingPaymentMethod", bookingPaymentMethod);

    return formData;

  }





  public createNewCardFormData(cardType: string, cardHolderName: string, cardExpiryMonth: string,
    cardExpiryYear: string, cardNumber: number, cardCVC: number): FormData {

    const formData = new FormData();
    formData.append("cardType", cardType);
    formData.append("cardHolderName", cardHolderName);
    formData.append("cardExpiryMonth", cardExpiryMonth);
    formData.append("cardExpiryYear", cardExpiryYear);
    formData.append("cardNumber", cardNumber.toString());
    formData.append("cardCVC", cardCVC.toString());

    return formData;

  }

  public createBillingAddressFormData(paymentMethodBillingAddressLine1: string,
    paymentMethodBillingAddressLine2: string, paymentMethodBillingCity: string,
    paymentMethodBillingState: string, paymentMethodBillingZipCode: number,
    paymentMethodBillingCountry: string, paymentMethodId: number): FormData {

    const formData = new FormData();
    formData.append("paymentMethodBillingAddressLine1", paymentMethodBillingAddressLine1);
    formData.append("paymentMethodBillingAddressLine2", paymentMethodBillingAddressLine2);
    formData.append("paymentMethodBillingCity", paymentMethodBillingCity);
    formData.append("paymentMethodBillingState", paymentMethodBillingState);
    formData.append("paymentMethodBillingZipCode", paymentMethodBillingZipCode.toString());
    formData.append("paymentMethodBillingCountry", paymentMethodBillingCountry);
    formData.append("paymentMethodId", paymentMethodId.toString());

    return formData;

  }


  public addBookingsToLocalCache(bookings: Booking[]): void {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  public addBookingsToLocalCacheAdmin(bookings: Booking[]): void {
    localStorage.setItem('Allbookings', JSON.stringify(bookings));
  }


  public getBookingsFromLocalCache(): Booking[] {
    if (localStorage.getItem('bookings')) {

      return JSON.parse(localStorage.getItem('bookings') || '');

    }

    return [];

  }

  public getBookingsFromLocalCacheAdmin(): Booking[] {
    if (localStorage.getItem('Allbookings')) {

      return JSON.parse(localStorage.getItem('Allbookings') || '');

    }

    return [];

  }


}
