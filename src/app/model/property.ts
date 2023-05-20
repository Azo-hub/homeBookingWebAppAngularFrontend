import { User } from "./user";

export class Property {
    public id!: number;
    public name: string;
	public propertyType: string;
	public propertyPrice: number;
	public propertyCountry: string;
    public propertyState: string;
    public propertyCity: string;
	public propertyAddress: string;
    public propertyZipCode: string;
    
    public lastLoginDateDisplay!: Date;
    public propertyImage!: File;
    public propertyOwner!:User;
    public propertyCleaningFee:number;
    public theSpace_noOfAccommodation: string;
    public theSpace_noOfBathrooms: string;
    public theSpace_noOfBedrooms: string;
    public beds_noOfKing: string;
    public beds_noOfQueen: string;
    public beds_noOfSingle: string;
    public bathrooms_noOfMasterBathroom: string;
    public bathrooms_noOfPrivateBathroom: string;
    public bathrooms_noOfHalfBath: string;
    public sharedSpaces_kitchen: string;
    public sharedSpaces_laudryRoom: string;
    public sharedSpaces_outDoorParking: string;
    public sharedSpaces_garage: string;
    public sharedSpaces_balcony: string;
    public sharedSpaces_backyard: string;
	
   
	
    constructor() {
        
        this.name = "";
        this.propertyType = "";
        this.propertyPrice = 0;
        this.propertyCountry = "";
        this.propertyCity = "";
        this.propertyState = "";
        this.propertyAddress = "";
        this.propertyZipCode = "";
        
        this.propertyCleaningFee = 0;
        this.theSpace_noOfAccommodation = "";
        this.theSpace_noOfBathrooms = "";
        this.theSpace_noOfBedrooms = "";
        this.beds_noOfKing = "";
        this.beds_noOfQueen = "";
        this.beds_noOfSingle = "";
        this.bathrooms_noOfMasterBathroom = "";
        this.bathrooms_noOfPrivateBathroom = "";
        this.bathrooms_noOfHalfBath = "";
        this.sharedSpaces_kitchen = "";
        this.sharedSpaces_laudryRoom = "";
        this.sharedSpaces_outDoorParking = "";
        this.sharedSpaces_garage = "";
        this.sharedSpaces_balcony = "";
        this.sharedSpaces_backyard = "";
        
    }

}
