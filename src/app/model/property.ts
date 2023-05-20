import { User } from "./user";

export class Property {
    public id!: number;
    public name: string;
    public propertyType: string;
    public propertyPrice: number;
    public propertyCountry: string;
    public propertyState: string;
    public propertyCity: string;
    public propertyAddress1: string;
    public propertyAddress2: string;
    public propertyZipCode: string;
    public lastLoginDateDisplay!: Date;
    public propertyImage!: File;
    public propertyOwner!: User;
    public propertyCleaningFee: number;
    public theSpace_noOfAccommodation: string;
    public theSpace_noOfBathrooms: number;
    public theSpace_noOfBedrooms: string;
    public beds_noOfKing: string;
    public beds_noOfQueen: string;
    public beds_noOfSingle: string;
    public bathrooms_noOfMasterBathroom: string;
    public bathrooms_noOfPrivateBathroom: string;
    public bathrooms_noOfHalfBath: string;
    public sharedSpaces_kitchen: string;
    public sharedSpaces_laundryRoom: string;
    public sharedSpaces_outDoorParking: string;
    public sharedSpaces_garage: string;
    public sharedSpaces_balcony: string;
    public sharedSpaces_backyard: string;
    public amenities_wifi: string;
    public amenities_towelsBedsheetsSoapAndToiletpaper: string;
    public amenities_shampoo: string;
    public amenities_closetDrawers: string;
    public amenities_hairDryer: string;
    public amenities_LEDTV: string;
    public amenities_grill: string;
    public amenities_parking: string;
    public amenities_outdoorSwimmingPool: string;
    public amenities_ironBoard: string;
    public amenities_satelliteOrCable: string;
    public amenities_microwave: string;
    public amenities_boardGames: string;
    public amenities_toaster: string;
    public amenities_coffeeMaker: string;
    public amenities_stove: string;





    constructor() {

        this.name = "";
        this.propertyType = "";
        this.propertyPrice = 0;
        this.propertyCountry = "";
        this.propertyCity = "";
        this.propertyState = "";
        this.propertyAddress1 = "";
        this.propertyAddress2 = "";
        this.propertyZipCode = "";
        this.propertyCleaningFee = 0;
        this.theSpace_noOfAccommodation = "";
        this.theSpace_noOfBathrooms = Number(this.bathrooms_noOfMasterBathroom) + Number(this.bathrooms_noOfPrivateBathroom);
        this.theSpace_noOfBedrooms = "";
        this.beds_noOfKing = "";
        this.beds_noOfQueen = "";
        this.beds_noOfSingle = "";
        this.bathrooms_noOfMasterBathroom = "";
        this.bathrooms_noOfPrivateBathroom = "";
        this.bathrooms_noOfHalfBath = "";
        this.sharedSpaces_kitchen = "";
        this.sharedSpaces_laundryRoom = "";
        this.sharedSpaces_outDoorParking = "";
        this.sharedSpaces_garage = "";
        this.sharedSpaces_balcony = "";
        this.sharedSpaces_backyard = "";
        this.amenities_wifi = "";
        this.amenities_towelsBedsheetsSoapAndToiletpaper = "";
        this.amenities_shampoo = "";
        this.amenities_closetDrawers = "";
        this.amenities_hairDryer = "";
        this.amenities_LEDTV = "";
        this.amenities_grill = "";
        this.amenities_parking = "";
        this.amenities_outdoorSwimmingPool = "";
        this.amenities_ironBoard = "";
        this.amenities_satelliteOrCable = "";
        this.amenities_microwave = "";
        this.amenities_boardGames = "";
        this.amenities_toaster = "";
        this.amenities_coffeeMaker = "";
        this.amenities_stove = "";

    }

}
