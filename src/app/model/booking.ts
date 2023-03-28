import { Property } from "./property";
import { User } from "./user";

export class Booking {
    public id!: number;
    public bookingCheckInDate: Date;
    public bookingCheckOutDate: Date;
    public totalPrice: number;
    public propertyId!: number;
    public userId: number;
    public bookingFirstName: string; 
    public bookingLastName: string; 
    public bookingEmailAddress: string; 
    public bookingPhoneNumber: string; 
    public bookingHomePhoneNumber: string; 
    public bookingCountry: string; 
    public bookingStreet: string; 
    public bookingCity: string; 
    public bookingState: string; 
    public  bookingZipCode: string; 
   
	
	constructor() {
        
        this.bookingCheckInDate = new Date;
        this.bookingCheckOutDate = new Date;
        this.totalPrice = 0;
        this.bookingFirstName = "";
        this.bookingLastName = "";
        this.bookingEmailAddress = "";
        this.bookingPhoneNumber = "";
        this.bookingHomePhoneNumber = "";
        this.bookingCountry = "";
        this.bookingStreet = "";
        this.bookingCity = "";
        this.bookingState = "";
        this.bookingZipCode = "";
        
    }
}