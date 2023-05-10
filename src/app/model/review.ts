import { Property } from "./property";

export class Review {
    public id!:number;
    public reviewContent:string;
    public reviewAuthor:string;
    public reviewLocation:string;
    public property!: Property;

    constructor() {
        
    this.reviewContent = "";
    this.reviewAuthor = "";
    this.reviewLocation = "";

    }
}
