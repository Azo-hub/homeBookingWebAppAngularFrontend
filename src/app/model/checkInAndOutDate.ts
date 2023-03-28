import { Property } from "./property";

export class CheckInAndOutDate {
    public id!: number;
    public noOfGuest: string;
    public checkInDate:Date;
    public checkOutDate:Date;
    public propertyId:number;
	
    constructor() {
        
        this.noOfGuest = "";
        this.checkInDate = new Date;
        this.checkOutDate = new Date;
        this.propertyId=0;
        
    }

	
}