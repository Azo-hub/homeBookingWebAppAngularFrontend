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
    public description: string;
    public lastLoginDateDisplay!: Date;
    public propertyImage!: File;
    public propertyOwner!:User;
    public propertyCleaningFee:number;
    
    
	
   
	
    constructor() {
        
        this.name = "";
        this.propertyType = "";
        this.propertyPrice = 0;
        this.propertyCountry = "";
        this.propertyCity = "";
        this.propertyState = "";
        this.propertyAddress = "";
        this.propertyZipCode = "";
        this.description = "";
        this.propertyCleaningFee = 0;
       
       

        
    }

}
