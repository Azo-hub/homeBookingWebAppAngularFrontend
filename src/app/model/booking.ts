import { PaymentMethod } from "./payment-method";
import { Property } from "./property";
import { User } from "./user";

export class Booking {
    public id!: number;
    public bookingCheckInDate: Date;
    public bookingCheckOutDate: Date;
    public totalPrice: number;
    public property: Property;
    public user: User;
    public bookingFirstName: string;
    public bookingLastName: string;
    public bookingEmailAddress: string;
    public bookingPhoneNumber: string;
    public bookingPhonehomeNumber: string;
    public bookingCountry: string;
    public bookingStreet: string;
    public bookingCity: string;
    public bookingState: string;
    public bookingZipCode: string;
    public noOfDays!: number;
    public noOfGuest: string;
    public noOfChildren: string;
    public pets: string;
    public paymentMethod: PaymentMethod;


    constructor() {

        this.bookingCheckInDate = new Date;
        this.bookingCheckOutDate = new Date;
        this.totalPrice = 0;
        this.bookingFirstName = "";
        this.bookingLastName = "";
        this.bookingEmailAddress = "";
        this.bookingPhoneNumber = "";
        this.bookingPhonehomeNumber = "";
        this.bookingCountry = "";
        this.bookingStreet = "";
        this.bookingCity = "";
        this.bookingState = "";
        this.bookingZipCode = "";
        this.noOfGuest = "";
        this.noOfChildren = "";
        this.pets = "";
        this.paymentMethod = new PaymentMethod;


    }
}